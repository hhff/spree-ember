import Ember from 'ember';
/**
  The checkouts service is a Stateful global for progressing an Order through 
  the Spree checkout, via the Checkouts endpoint.  It also serves as the 
  "canonical" state for a Checkout frontend, and should be used to progress
  forward and backward through an order's steps.

  It's designed to allow a reactive programming style for the checkout 
  frontend.  The `spree-checkout` component from the Spree Ember Storefronts
  package is an example of this style.

  ```javascript
  var checkouts = this.get('spree.checkouts');

  checkouts.get('currentState');
  // => "address"
  
  checkouts.transition().then(function() {
    checkouts.get('currentOrder.state');
    // => "delivery"
    checkouts.get('currentState');
    // => "delivery"

    checkouts.transition("address").then(function() {

      // Here, the Checkout and Current Order state has diverged.  This is
      // expected behaviour, and their states will reconcile when the 
      // checkout progresses forward again.
      
      checkouts.get('currentOrder.state');
      // => "delivery"
      checkouts.get('currentState');
      // => "address"
    });
  });
  ```

  @class Checkouts
  @extends Ember.Service
  @uses Ember.FSM.Stateful
*/
export default Ember.Service.extend(Ember.FSM.Stateful, {
  /**
    Provided by Ember FSM, the current state of the checkout.  This will often
    diverge from the `currentOrder.get('state')`, and will be reconsoidated when
    the state machine calls `validateOrder`.  This is what we use as the 
    cononical "state" for a frontend's Checkout flow.

    @property currentState
    @type String
    @default "idle"
  */

  /**
    A reference to the Spree Service.
    
    @property spree 
    @type Ember.Service
  */
  spree: Ember.inject.service('spree'),
  /**
    A reference to the Spree Object's `currentOrder`.

    @property currentOrder
    @type DS.Model
  */
  currentOrder: Ember.computed.alias('spree.currentOrder'),
  /**
    Used by Ember FSM to name the `initialState`.

    @property fsmStates
    @type Object
  */
  fsmStates: {
    initialState: 'idle'
  },
  /**
    Used by Ember FSM to describe the checkout flow.

    @property fsmEvents 
    @type Object
  */
  fsmEvents: {
    toCart: {
      transition: { 
        from: ['$initial', 'failed'],
        to: 'cart'
      }
    },
    toAddress: {
      after: '_ensureShipAddressExists',
      transitions: [
        {
          from: ['cart'],
          to: 'address',
          willEnter: '_validateOrder'
        },
        {
          from: ['$initial', 'delivery', 'payment', 'confirm', 'failed'],
          to: 'address'
        }
      ]
    },
    toDelivery: { 
      transitions: [
        {
          from: ['address'],
          to: 'delivery',
          willEnter: '_validateOrder'
        },
        {
          from: ['$initial', 'payment', 'confirm', 'failed'],
          to: 'delivery'
        }
      ]
    },
    toPayment: {
      after: '_ensurePaymentExists',
      transitions: [
        {
          from: ['cart', 'address', 'delivery'],
          to: 'payment',
          willEnter: '_validateOrder'
        },
        {
          from: ['$initial', 'confirm', 'failed'],
          to: 'payment'
        }
      ]
    },
    toConfirm: {
      transitions: [
        {
          from: ['address', 'delivery', 'payment'],
          to: 'confirm',
          willEnter: '_validateOrder'
        },
        {
          from: ['$initial', 'failed'],
          to: 'confirm'
        }
      ]
    },
    toComplete: {
      transition: {
        from: ['payment', 'confirm'],
        to: 'complete',
        willEnter: '_validateOrder',
      }
    },
    toIdle: {
      transition: { 
        $all: 'idle' 
      }
    },
    error: {
      after: '_resetStateMachine',
      transition: { 
        $all: 'failed' 
      }
    }
  },
  /**
    If a state name is passed to this method, the state machine will attempt to
    transition directly to that state.  If not, we will attempt to transition
    to the next state in the checkout flow.

    @method transition 
    @param {String} stateName Optional, a state to attempt transition to.
    @return {Ember.RSVP.Promise} A promise that resolves when the State Machine
    resolves it's transition.
  */
  transition: function(stateName) {
    var nextStateName;
    var checkoutState = this.get('currentState');

    if (this.get('currentOrder')) {
      if (stateName) {
        nextStateName = stateName;
      } else {
        var allStates = this.get('currentOrder.checkoutSteps');
        if (checkoutState === "failed") {
          nextStateName = this.get("currentOrder.state");
        } else {
          nextStateName = allStates[allStates.indexOf(checkoutState) + 1];
        }
      }
    } else {
      nextStateName = 'idle';
    }
    
    var stateAction = "to" + Ember.String.capitalize(nextStateName);
    return this.sendStateEvent(stateAction);
  },
  /**
    Called whenever the State Machine enters "Address".  Ensures that an address
    object exists for the order's `shipAddress`.

    @method _ensureShipAddressExists
    @private
  */
  _ensureShipAddressExists: function() {
    var shipAddress = this.get('currentOrder.shipAddress');
    if (!shipAddress) {
      var newShipAddress = this.get('spree').store.createRecord('address');
      this.set('currentOrder.shipAddress', newShipAddress);
    }
  },
  /**
    Called whenever the State Machine enters "Payment".  Ensures that a payment
    and source object exists for the `currentOrder`.

    @method _ensurePaymentExists
    @private
  */
  _ensurePaymentExists: function() {
    var spree    = this.get('spree');
    var payments = this.get('currentOrder.payments');
    if (Ember.isEmpty(payments)) {
      var payment = spree.store.createRecord('payment');
      var source  = spree.store.createRecord('source');
      payment.set('paymentMethod', this.get('currentOrder.availablePaymentMethods.firstObject'));
      payment.set('source', source);
      payments.pushObject(payment);
    }
  },
  /**
    When `validateOrder` fails, the State Machine will automatically transition
    to "failed".  Here, we listen to that transition, and then automatically
    run this method, to reset the State Machine to the State of the 
    `currentOrder`.

    Note: Because Ember QUnit relies on returned promise for Unit tests, we 
    disable this method in `test`, and manually reset the State Machine when
    testing failed transitions.

    @method _resetStateMachine 
    @private
  */
  _resetStateMachine: function() {
    return this.transition();
  },
  /**
    Used to save changes to the `currentOrder` to Spree's Checkouts API.  Is only
    called by the state machine when advancing to a later state in the flow.

    @method _validateOrder 
    @private
    @param {Transition} transition The current state machine transition.
    @return {Ember.RSVP.Promise} A promise that resolves when the server
    response returns.
  */
  _validateOrder: function(transition) {
    var _this = this;

    return new Ember.RSVP.Promise(function(resolve, reject) {
      _this.get('currentOrder').saveToCheckouts().then(
        function(currentOrder) {
          if (currentOrder.get('state') === transition.toState) {
            resolve(currentOrder);
          } else {
            reject();
          }
        },
        function() {
          reject();
        }
      );
    });
  }
});
