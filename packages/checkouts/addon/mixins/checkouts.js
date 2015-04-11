/* globals StateMachine */

import Ember from 'ember';

/**
  Provides Current Order and Checkout Functionality to the Spree service.

  @class Checkouts
  @namespace Spree Ember
  @module ember-cli-spree-core/mixins/checkouts
  @extends Ember.Mixin
*/
export default Ember.Mixin.create({
  /**
    Triggered whenever a Spree Server request fails.

    @event serverError
    @param {Object} error The error object returned from the Spree Server.
  */

  /**
    Triggered whenever a Line Item is created or updated.

    @event didAddToCart
    @param {Object} lineItem The newly updated lineItem object
  */

  /**
    Triggered whenever a new Order is created for the checkout user.

    @event didCreateNewOrder
    @param {Object} order The newly created order object
  */

  /**
    Triggered whenever the Current Order changes State.

    @event checkoutStateDidChange
    @param {String} order A string representing the new state.
  */

  /**
    Triggered whenever the Current Order reached it's "Complete" State.

    @event currentOrderDidComplete
    @param {String} order A string representing the new state.
  */

  /**
    A method called in the `ember-cli-spree-checkouts` initializer after the
    `Checkouts` mixin is applied to the Spree service, to initialize functionality
    in this mixin.

    @method initCheckouts
    @param {Ember.Application} application A reference to the initializing Application.
    @return {Boolean} Always resolves to `true`.
  */
  initCheckouts: function(application) {
    var _this = this;
    this.restore();

    var orderId = this.get('orderId');
    if (orderId) {
      application.deferReadiness();
      this.store.find('order', orderId).then(
        function(currentOrder) {
          _this.set('currentOrder', currentOrder);
          _this._setupStateMachineForOrder(currentOrder);
          application.advanceReadiness();
        },
        function(error) {
          application.advanceReadiness();
          _this.persist({
            guestToken: null,
            orderId: null
          });
          _this.trigger('serverError', error);
          return error;
        }
      );
    }
    return true;
  },

  /**
    A reference to the Current Order.  It is only set twice in this code,
    once on Application initialization (in the case it was persisted), and once
    when a new order is created through the internal method `_createNewOrder`.

    @property currentOrder
    @type DS.Model
    @default true
  */
  shipToBilling: true,

  /**
    A reference to the Current Order.  It is only set twice in this code,
    once on Application initialization (in the case it was persisted), and once
    when a new order is created through the internal method `_createNewOrder`.

    @property currentOrder
    @type DS.Model
    @default null
  */
  currentOrder: null,

  /**
    Adds state machine functionality to the Spree service.

    @method _setupStateMachineForOrder
    @private
    @param {Ember.Object} order A reference to the Current Order
    @return {StateMachine} Returns the newly instantiated StateMachine instance.
  */
  _setupStateMachineForOrder: function(order) {
    return StateMachine.create({
      initial:   order.get('state'),
      events:    this.get('eventsForOrderStateMachine'),
      callbacks: this.get('callbacksForOrderStateMachine'),
    }, this);
  },

  /**
    An overrideable Array representing the possible states of the order, and it's
    possible transitions.  This should be informed by the Spree backend. The default
    values will work with Spree's default checkout steps.

    @property eventsForOrderStateMachine
    @type Array
    @default Array
  */
  eventsForOrderStateMachine: [
    { name: 'transitionToCart',     from: ['cart', 'address', 'delivery', 'payment', 'confirm'], to: 'cart' },
    { name: 'transitionToAddress',  from: ['cart', 'address', 'delivery', 'payment', 'confirm'], to: 'address' },
    { name: 'transitionToDelivery', from: ['cart', 'address', 'delivery', 'payment', 'confirm'], to: 'delivery' },
    { name: 'transitionToPayment',  from: ['cart', 'address', 'delivery', 'payment', 'confirm'], to: 'payment' },
    { name: 'transitionToConfirm',  from: ['cart', 'address', 'delivery', 'payment', 'confirm'], to: 'confirm' },
    { name: 'transitionToComplete', from: ['cart', 'address', 'delivery', 'payment', 'confirm'], to: 'complete' }
  ],

  /**
    An overrideable Object for binding callbacks to state changes in the Current
    Spree Order.  `this` in these callbacks represents the Current Order object.

    @property callbacksForOrderStateMachine
    @type Object
    @default Object
  */
  callbacksForOrderStateMachine: {
    onenterstate: function() {
      this.trigger('checkoutStateDidChange', this.current);
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
        // if (transitionEvent === "transitionToCompletex") {
        //   this._advanceOrderState().then(
        //     function(response) {
        //       Ember.run.once(_this, _this._handlePendingTransition, {
        //         response: response,
        //         toState: toState
        //       });
        //     },
        //     function(error) {
        //       _this.transition.cancel();
        //       return error
        //     }
        //   )
        // } else {
        this._updateOrderData().then(
          function(response) {
            Ember.run.once(_this, _this._handlePendingTransition, {
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
    onleavecart: function() {},
    onenteraddress: function() {
      var billAddress = this.get('currentOrder.billAddress');
      if (!billAddress) {
        var newBillAddress = this.store.createRecord('address');
        this.set('currentOrder.billAddress', newBillAddress);
      }
    },
    onleaveaddress: function() {
      var shipAddress = this.get('currentOrder.shipAddress');
      var billAddress = this.get('currentOrder.billAddress');
      if (!shipAddress) {
        this.set('currentOrder.shipAddress', billAddress);
      }
    },
    onenterdelivery: function() {},
    onleavedelivery: function() {},
    onenterpayment: function() {
      var payments = this.get('currentOrder.payments');
      if (Ember.empty(payments)) {
        var payment = this.store.createRecord('payment');
        var source  = this.store.createRecord('source');
        payment.set('paymentMethod', this.get('currentOrder.availablePaymentMethods.firstObject'));
        payment.set('source', source);
        payments.pushObject(payment);
      }
    },
    onleavepayment: function() {},
    onenterconfirm: function() {},
    onleaveconfirm: function() {},
    onentercomplete: function() {
      this.trigger('currentOrderDidComplete', this.get('currentOrder'));
    },
    onleavecomplete: function() {}
  },

  _handlePendingTransition: function(args) {
    var response       = args.response;
    var toState        = args.toState;

    if (response.errors) {
      /*
        Response returned with errors, so we have to cancel the transition,
        most likely this is due to a validation error.  The _updateOrderData
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
          State returned successfull but was the same as the initial state, so we
          attempt to force the order state to advance so we get an explicit error
          to show the user.
        */
        var _this = this;
        this._advanceOrderState().then(
          function(response) {
            if (response.errors) {
              /*
                The _advanceOrderState will handle triggering the serverError
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
              This will only ever call if the AJAX request from _advanceOrderState
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
  },


  /**
    If a state name is passed to this method, the state machine will attempt to
    transition directly to that state.  If not, we will attempt to transition
    to the next state in the checkout flow.

    @method transitionCheckoutState
    @param {String} stateName Optional, a state to attempt transition to.
    @return {Function} A dynamically created IIFE corresponding to a State
    Machine event name.  See `eventsForOrderStateMachine`.
  */
  transitionCheckoutState: function(stateName) {
    var nextStateName;

    if (stateName) {
      nextStateName = stateName;
    } else {
      var allStates = this.get('currentOrder.checkoutSteps');
      if (this.current === "cart") {
        nextStateName = allStates[0];
      } else if (this.current === "complete") {
        throw new Error("Spree Ember: Can't transition order past 'Complete' state.");
      } else {
        nextStateName = allStates[allStates.indexOf(this.current) + 1];
      }
    }

    return new Function(
      "return this.transitionTo"+Ember.String.capitalize(nextStateName)+"();"
    ).apply(this);
  },

  /**
    This method will send data to Spree's Checkouts API in the format it expects.
    It will also automatically transition the order to a certain state if it has
    enough information to satisfy Spree's Order State Machine.

    @method _updateOrderData
    @private
    @return {Ember.RSVP.Promise} A promise that resolves to either a successful
    server response (that may contain errors in the payload), or an AJAX error.
  */
  _updateOrderData: function() {
    var _this             = this;
    var order             = this.get('currentOrder');
    var orderId           = order.get('id');
    var adapter           = this.get('container').lookup('adapter:-spree');
    var url               = adapter.buildURL('checkout', orderId);
    var data              = this._dataObjectForOrderUpdate(order, adapter, this.current);

    return adapter.ajax(url, 'PUT', { data: data }).then(
      function(orderPayload) {
        _this.store.pushPayload('order', orderPayload);
        return _this.store.find('order', orderPayload.order.id);
      },
      function(error) {
        _this.trigger('serverError', error);
        return error;
      }
    );
  },

  _dataObjectForOrderUpdate: function(order, adapter, currentState) {
    var data = {
      order: adapter.serialize(order),
      state: currentState
    };

    switch(currentState) {
      case "address":
        var billAddress = order.get('billAddress');
        if (billAddress) {
          data.order['bill_address_attributes'] = adapter.serialize(billAddress);
        }
        var shipAddress = order.get('shipAddress');
        if (shipAddress) {
          data.order['ship_address_attributes'] = adapter.serialize(shipAddress);
        }
        break;
      case "delivery":
        var shipments = order.get('shipments');
        if (shipments) {
          data.order['shipments_attributes'] = {};
          shipments.forEach(function(shipment, index) {
            data.order.shipments_attributes[index] = adapter.serialize(shipment);
          });
        }
        break;
      case "payment":
        var payment = order.get('payments.firstObject');
        if (payment && payment.get('source.isDirty')) {
          data['payment_source'] = {};
          data.order['payments_attributes'] = [{payment_method_id: payment.get('paymentMethod.id')}];
          data.payment_source[payment.get('paymentMethod.id')] = adapter.serialize(payment.get('source'));
        }
        break;
    }

    return data;
  },

  /**
    This method will attempt to force the Order's state to the next State.  It's
    necessary for the "confirm" -> "complete" transition for Spree, and also useful
    for triggering validation errors, when it's not clear why an order won't advance
    to the next state.

    @method _advanceOrderState
    @private
    @return {Ember.RSVP.Promise} A promise that resolves to either a successful
    server response (that may contain errors in the payload), or an AJAX error.
  */
  _advanceOrderState: function() {
    var _this   = this;
    var order   = this.get('currentOrder');
    var orderId = order.get('id');
    var adapter = this.get('container').lookup('adapter:-spree');
    var url     = adapter.buildURL('checkout', orderId)+"/next.json";

    return adapter.ajax(url, 'PUT').then(
      function(orderPayload) {
        _this.store.pushPayload('order', orderPayload);
        return _this.store.find('order', orderPayload.order.id);
      },
      function(error) {
        _this.trigger('serverError', error);
        return error;
      }
    );
  },

  /**
    The token used to Authenticate the current user against the current order.  Persisted
    to local storage via `ember-cli-spree-core/mixins/storable`.  This property is
    sent to the Spree server via the header `X-Spree-Order-Token`.

    @property guestToken
    @type String
    @readOnly
    @default null
  */
  guestToken: null,

  /**
    The user's Current Order number, persisted to local storage via
    `ember-cli-spree-core/mixins/storable`.  This property is sent to the Spree
    server via the header `X-Spree-Order-Id`.

    @property orderId
    @type String
    @readOnly
    @default null
  */
  orderId: null,

  /**
    A computed property that returns all of the countries (and states) set up in
    Spree's backend.

    @method countries
    @type Computed
    @return {Ember.RSVP.Promise} Returns a promise that resolves to all of the
    countries saved in the Spree backend.
  */
  countries: Ember.computed(function() {
    return this.store.find('country');
  }),

  /**
    Adds a lineItem to the currentOrder. If there is no Current Order,
    Spree Ember will request a new order from the server, and set it as the
    Current Order on the Spree service.

    @method addToCart
    @param {Ember.Object} variant A class of the variant model
    @param {Integer} quantity A quantity for the Line Item.
    @return {Ember.RSVP.Promise} A promise that resolves to the newly saved Line Item.
  */
  addToCart: function(variant, quantity) {
    var _this        = this;
    var currentOrder = this.get('currentOrder');

    if (currentOrder) {
      return _this._saveLineItem(variant, quantity, currentOrder);
    } else {
      return this._createNewOrder().then(
        function(currentOrder) {
          return _this._saveLineItem(variant, quantity, currentOrder);
        },
        function(error) {
          _this.trigger('serverError', error);
          return error;
        }
      );
    }
  },

  /**
    An internal method for saving Line Items.  If it is called for a variant that
    is already in the current order, it will add to the corresponding Line Item's
    quantity, otherwise it will create a new Line Item for that variant.

    @method _saveLineItem
    @private
    @param {Ember.Object} variant A class of the variant model
    @param {Integer} quantity A quantity for the `lineItem`
    @param {Ember.Object} order The corresponding order
    @return {Ember.RSVP.Promise} A promise that resolves to the newly created or
    updated `lineItem` object.
  */
  _saveLineItem: function(variant, quantity, order) {
    var _this = this;
    var lineItem = order.get('lineItems').findBy('variant', variant);

    if (lineItem) {
      var currentQuantity = lineItem.get('quantity');
      lineItem.set('quantity', currentQuantity + quantity);
    } else {
      lineItem = this.store.createRecord('lineItem', {
        variant:  variant,
        quantity: quantity
      });
    }

    return lineItem.save().then(
      function(lineItem) {
        _this.trigger('didAddToCart', lineItem);
        return lineItem;
      },
      function(error) {
        _this.trigger('serverError', error);
        return error;
      }
    );
  },

  /**
    Will attempt to create a new Order for the checkout user, and save the `orderId`
    and `guestToken` to the Spree service, so that it will persist across page
    refreshes.  It will also initiate the state machine for the current order.

    @method _createNewOrder
    @private
    @return {Ember.RSVP.Promise} A promise that resolves to the newly created
    Spree Order.
  */
  _createNewOrder: function() {
    var _this = this;
    return this.store.createRecord('order').save().then(
      function(newOrder) {
        _this.set('currentOrder', newOrder);
        _this.persist({
          guestToken: newOrder.get('guestToken'),
          orderId:    newOrder.get('id')
        });
        _this.trigger('didCreateNewOrder', newOrder);
        _this._setupStateMachineForOrder(newOrder);
        return newOrder;
      },
      function(error) {
        _this.trigger('serverError', error);
        return error;
      }
    );
  },

  /**
    Clears the current order and any reference to it.

    @method clearCurrentOrder
    @return {Boolean} Always returns `true`.
  */
  clearCurrentOrder: function() {
    this.persist({
      guestToken: null,
      orderId: null
    });
    this.set('currentOrder', null);
    return true;
  },

  /**
    A place for overridable checkout redirect logic.

    @method _createNewOrder
    @private
    @return {Ember.RSVP.Promise} A promise that resolves to the newly created
    Spree Order.
  */
  redirect: function(route) {
    var currentOrder = this.get('currentOrder');
    if (currentOrder) {
      var state = currentOrder.get('state');
      if (state === "cart") {
        this.transitionCheckoutState();
      } else {
        route.transitionTo("spree.checkout."+state);
      }
    } else {
      route.transitionTo('spree.products.index');
    }
  }

});
