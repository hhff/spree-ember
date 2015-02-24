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

    @event orderStateDidChange
    @param {String} order A string representing the new state.
  */


  /**
    The token used to Authenticate the current user with the current order.  Persisted
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
    If the `orderId` is set, this will return a promise that resolves to the checkout
    user's Current Order (or an error).  In that case that the promise is rejected,
    the `orderId` and `guestToken` will be set to `null`.

    @method currentOrder
    @return {Ember.RSVP.Promise} A promise that resolves to the checkout user's
    current Spree Order.
  */
  currentOrder: Ember.computed('orderId', function() {
    var _this   = this;
    var orderId = this.get('orderId');
    if (orderId) {
      var promise = this.store.find('order', orderId);
      promise.catch(function(error) {
        _this.persist({
          guestToken: null,
          orderId: null
        });
      });
      return promise;
    } else {
      return null;
    }
  }),

  /**
    If the `orderId` is set, this will return a promise that resolves to the checkout
    user's Current Order (or an error).  In that case that the promise is rejected,
    the `orderId` and `guestToken` will be set to `null`.  If there is no Current Order,
    Spree Ember will request a new order from the server, and set it as the Current Order
    on the Spree service.

    @method addToCart
    @param {Ember.Object} variant A class of the variant model
    @param {Integer} quantity A quantity for the Line Item.
    @return {Ember.RSVP.Promise} A promise that resolves to the newly saved Line Item.
  */
  addToCart: function(variant, quantity) {
    var _this = this;
    var currentOrderPromise = this.get('currentOrder') || this._createNewOrder();
    return currentOrderPromise.then(
      function(currentOrder) {
        return _this._saveLineItem(variant, quantity, currentOrder);
      },
      function(error) {
        _this.trigger('serverError', error);
        return error;
      }
    );
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
        quantity: quantity,
        order:    order
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
    )
  },

  /**
    Will attempt to create a new Order for the checkout user, and save the `orderId`
    and `guestToken` to the Spree service, so that it will persist across page
    refreshes.

    @method _createNewOrder
    @private
    @return {Ember.RSVP.Promise} A promise that resolves to the newly created
    Spree Order.
  */
  _createNewOrder: function() {
    var _this = this;
    return this.store.createRecord('order').save().then(
      function(newOrder) {
        _this.persist({
          guestToken: newOrder.get('guestToken'),
          orderId:    newOrder.get('id')
        })
        _this.trigger('didCreateNewOrder', newOrder);
        return newOrder;
      },
      function(error) {
        debugger;
        _this.trigger('serverError', error);
        return error;
      }
    );
  },

  /**
    Will attempt to advance the state of the checkout user's Current Order.

    @method _createNewOrder
    @private
    @return {Ember.RSVP.Promise} A promise that resolves to the newly updated
    Spree Order.
  */
  advanceOrderState: function() {
    var _this = this;

    return this.get('currentOrder').then(
      function(currentOrder) {
        return _this._checkoutsRequest(currentOrder, true);
      },
      function(error) {
        _this.trigger('serverError', error);
        return error;
      }
    )
  },

  _checkoutsRequest: function(order, attemptNext) {
    var _this             = this;
    var next              = attemptNext || false;
    var orderId           = order.get('id');
    var initialOrderState = order.get('state');
    var adapter           = this.get('container').lookup('adapter:-spree');
    var orderData         = adapter.serialize(order);

    if (attemptNext) {
      var url = adapter.buildURL('checkout', orderId)+"/next.json";
    } else {
      var url = adapter.buildURL('checkout', orderId);
    }

    return adapter.ajax(url, 'PUT', { data: { order: orderData }}).then(
      function(orderPayload) {
        _this.store.pushPayload('order', orderPayload);
        var newState = orderPayload.order.state;
        if (newState !== initialOrderState) {
          _this.trigger('orderStateDidChange', newState);
        }
        return _this.store.find('order', orderPayload.order.id);
      },
      function(error) {
        _this.trigger('serverError', error);
        return error;
      }
    );
  },










  updateShipments: function(order) {
    var _this = this;

    // TODO Spree should have its own adapter & store
    var originalState = order.get('state');
    var adapter       = this.get('container').lookup('adapter:application');
    var updateURL     = adapter.buildURL('checkout', order.get('id'))+".json"
    var nextURL       = adapter.buildURL('checkout', order.get('id'))+"/next.json"

    var orderData = {
      shipments_attributes: {}
    };

    // Setup Shipments Data for Spree
    order.get('shipments').forEach(function(shipment, index) {
      var shipmentId             = shipment.get('id');
      var selectedShippingRateId = shipment.get('selectedShippingRate.id');
      orderData.shipments_attributes[index] = {
        selected_shipping_rate_id: selectedShippingRateId,
        id: shipmentId
      }
    });

    return adapter.ajax(nextURL, 'PUT', {data: {order: orderData}}).then(
      function(orderPayload) {
        _this.store.pushPayload(orderPayload);
        var newState = orderPayload.order.state;
        if (newState !== originalState) {
          _this.trigger('orderStateDidChange', newState);
        }
        return _this.store.find('order', orderPayload.order.id);
      },
      function(error) {
        _this.trigger('serverError', error);
        return error;
      }
    )
  },

  savePayments: function(order) {
    var _this = this;

    // TODO Spree should have its own adapter & store
    var originalState = order.get('state');
    var adapter       = this.get('container').lookup('adapter:application');
    var updateURL     = adapter.buildURL('checkout', order.get('id'))+".json"
    var nextURL       = adapter.buildURL('checkout', order.get('id'))+"/next.json"

    var orderData = {
      payments_attributes: [],
    };

    var payment_source = {};

    // These should realistically be serialized...
    order.get('payments').forEach(function(payment, index) {
      var paymentMethodId = payment.get('paymentMethod.id');
      var source          = payment.get('source');

      orderData.payments_attributes.push({payment_method_id: paymentMethodId});

      payment_source[paymentMethodId] = {
        number:             source.get('number').toString(),
        month:              source.get('month'),
        year:               source.get('year'),
        verification_value: source.get('verificationValue'),
        name:               source.get('name')
      }
    });

    return adapter.ajax(updateURL, 'PUT', {data: {order: orderData, payment_source: payment_source}}).then(
      function(orderPayload) {
        _this.store.pushPayload(orderPayload);
        var newState = orderPayload.order.state;
        if (newState !== originalState) {
          _this.trigger('orderStateDidChange', newState);
        }
        return _this.store.find('order', orderPayload.order.id);
      },
      function(error) {
        _this.trigger('serverError', error);
        return error;
      }
    )
  }

});
