/**
  An overrideable Array representing the possible states of the order, and it's
  possible transitions.  This should be informed by the Spree backend. The default
  values will work with Spree's default checkout steps.

  @property orderStateEvents 
  @type Array
  @default Array
*/
export var orderStateEvents = [
  { name: 'transitionToCart',     from: ['cart', 'address', 'delivery', 'payment', 'confirm'], to: 'cart' },
  { name: 'transitionToAddress',  from: ['cart', 'address', 'delivery', 'payment', 'confirm'], to: 'address' },
  { name: 'transitionToDelivery', from: ['cart', 'address', 'delivery', 'payment', 'confirm'], to: 'delivery' },
  { name: 'transitionToPayment',  from: ['cart', 'address', 'delivery', 'payment', 'confirm'], to: 'payment' },
  { name: 'transitionToConfirm',  from: ['cart', 'address', 'delivery', 'payment', 'confirm'], to: 'confirm' },
  { name: 'transitionToComplete', from: ['cart', 'address', 'delivery', 'payment', 'confirm'], to: 'complete' }
];

/**
  An overrideable Object for binding callbacks to state changes in the Current
  Spree Order.  `this` in these callbacks represents the Current Order object.

  @property orderStateCallbacks
  @type Object
  @default Object
*/
export var orderStateCallbacks = {
  onenterstate: function() {
    this.trigger('checkoutStateDidChange', this.get('currentOrder'));
  },
  onleavestate: function(transitionEvent, fromState, toState) {
    var _this          = this;
    var currentOrder   = this.get('currentOrder');
    var allStates      = currentOrder.get('checkoutSteps');
    var previousState  = allStates.indexOf(this.current) > allStates.indexOf(toState);
    /*
      If the State Machine is starting up, or the checkout user is trying to
      transition to a previous state, we can simply allow the transition without
      attempting to contact the server. (ie "payment" -> "address")
    */
    if (transitionEvent !== "startup" && !previousState) {
      this._saveCurrentOrder().then(
        function(response) {
          Ember.run.once(_this, _this.resolvePendingTransition, {
            response: response,
            toState: toState
          });
        },
        function(error) {
          _this.transition.cancel();
          return error;
        }
      );
      return StateMachine.ASYNC;
    }
  },
  onenteraddress: function() {
    var shipAddress = this.get('currentOrder.shipAddress');
    if (!shipAddress) {
      var newShipAddress = this.store.createRecord('address');
      this.set('currentOrder.shipAddress', newShipAddress);
    }
  },
  onenterpayment: function() {
    var payments = this.get('currentOrder.payments');
    if (Ember.isEmpty(payments)) {
      var payment = this.store.createRecord('payment');
      var source  = this.store.createRecord('source');
      payment.set('paymentMethod', this.get('currentOrder.availablePaymentMethods.firstObject'));
      payment.set('source', source);
      payments.pushObject(payment);
    }
  },
  onentercomplete: function() {
    this.trigger('currentOrderDidComplete', this.get('currentOrder'));
  }
};

/**
  An overrideable Function for resolving a pending State Machine transition, 
  called after successful `saveCurrentOrder` call. 

  @property resolvePendingTransition
  @type Function 
  @default Function 
*/
export var resolvePendingTransition = function(args) {
  var response = args.response;
  var toState  = args.toState;

  if (response.errors) {
    /*
      Response returned with errors, so we have to cancel the transition,
      most likely this is due to a validation error.  The `saveCurrentOrder`
      call will trigger the serverError event, so we don't have to handle
      it here.
    */
    this.transition.cancel();
  } else {
    if (response.get('state') === toState) {
      /*
        Response returned successfully and has the State we're attempting to
        transition to, so all is good.
      */
      this.transition();
    } else if (response.get('state') === this.current) {
      /*
        Call returned successful but was the same as the initial state, so we
        attempt to force the order state to advance so we get an explicit error
        to show the user.
      */
      var _this = this;
      this._advanceCurrentOrder().then(
        function(response) {
          if (response.errors) {
            /*
              The advanceCurrentOrder call will handle triggering the serverError
              event, so here we just cancel the transition.
            */
            _this.transition.cancel();
          } else {
            /*
              This should theoretically never call, but in the case
              that /next.json doesn't return an errors payload, we can
              assume the order did change state, and continue with the
              transition.
            */
            _this.transition();
          }
        },
        function() {
          /*
            This will only ever call if the AJAX request from advanceCurrentOrder 
            fails.  It's error will be handled there, so we just cancel the
            transition here.
          */
          _this.transition.cancel();
        }
      );
    } else {
      /*
        The response's state is not the attempted state, nor is it the same
        state the as the State Machine currently.  We therefore check if the
        state we're attempting to get it has already been completed by the
        server (ie, we're going from "address" -> "delivery" but the order is
        in "payment").

        If this is not the case, we can assume that:
        - The response is not in the attempted state.
        - The response is not in the same state.
        - The attempted State is not completed by the order

        This means the response is in a state that is either:
        - A previously completed state that has become incomplete and needs to
        be redone, or
        - A new state entirely that has been inserted by the server.  Spree does this
        by inserting a confirmation step when Spree::Order.confirmation_required?
        is false, but the Spree Gateway supports payment profiles.

        Regardless, in this case we need to cancel the transition, and retrigger
        it dynamically.
      */
      var currentOrder   = response;
      var allStates      = currentOrder.get('checkoutSteps');
      var completedState = allStates.indexOf(currentOrder.get('state')) > allStates.indexOf(toState);

      if (completedState) {
        this.transition();
      } else {
        this.transition.cancel();
        this.transitionCheckoutState();
      }
    }
  }
};
