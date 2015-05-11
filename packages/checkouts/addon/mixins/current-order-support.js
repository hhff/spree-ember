import Ember from 'ember';

/**
  Provides Current Order and Checkout Functionality to the Spree service.  This
  mixin is applied to the Spree service when spree-ember-checkouts initializes,
  therefore all functionality described here is available like so:

  ```javascript
  this.spree.addToCart(variantModel, 5);
  ```

  @class CurrentOrderSupport
  @namespace Mixin
  @extends Ember.Mixin
*/
export default Ember.Mixin.create({
  /**
    A generic event triggered whenever a Spree Server request fails.

    @event serverError
    @param {Object} error The error object returned from the Spree Server.
  */

  /**
    Triggered whenever a Line Item is created or updated.

    @event didAddToCart
    @param {DS.Model} lineItem The newly updated lineItem object
  */

  /**
    Triggered whenever a Line Item is created or updated.

    @event addToCartFailed
    @param {Error} error The returned Server Error.  
  */

  /**
    Triggered whenever a new Order is created for the checkout user.

    @event didCreateNewOrder
    @param {DS.Model} order The newly created order object
  */

  /**
    Triggered whenever a new Order is created for the checkout user.

    @event newOrderCreateFailed
    @param {Object} error The returned Server Error.
  */
  
  /**
    Triggered whenever a new Order is created for the checkout user.

    @event didClearCurrentOrder
  */

  /**
    Triggered whenever the Current Order changes State.

    @event checkoutStateDidChange
    @param {DS.Model} order The Current Order.
  */

  /**
    Triggered when the `_saveCurrentOrder` call succeeds.

    @event didSaveCurrentOrder
    @param {Ember.RSVP.Promise} currentOrderPromise A promise that resolves to 
    the Current Order
  */

  /**
    Triggered when the `_saveCurrentOrder` call fails.

    @event saveCurrentOrderFailed 
    @param {Error} error The returned Server Error.  
  */

  /**
    Triggered when the `advanceCurrentOrder` call succeeds.

    @event didAdvanceCurrentOrder
    @param {Ember.RSVP.Promise} currentOrderPromise A promise that resolves to 
    the Current Order
  */

  /**
    Triggered when the `advanceCurrentOrder` call fails.

    @event advanceCurrentOrderFailed 
    @param {Error} error The returned Server Error.  
  */

  /**
    Triggered whenever the Current Order reached it's "Complete" State.

    @event currentOrderDidComplete
    @param {DS.Model} order The Current Order.
  */

  /**
    A method called in the `spree-ember-checkouts` initializer after the
    `Checkouts` mixin is applied to the Spree service, to initialize functionality
    in this mixin.

    @method _restoreCurrentOrder 
    @private
    @return {Boolean} Always resolves to `true`.
  */
  _restoreCurrentOrder: function() {
    this.restore();
    var orderId = this.get('orderId');
    
    var _this = this;
    
    return new Ember.RSVP.Promise(function(resolve) {
      if (orderId) {
        _this.store.find('order', orderId).then(
          function(currentOrder) {
            _this.set('currentOrder', currentOrder);
            return _this.get('checkouts').transition(currentOrder.get('state'));
          },
          function(error) {
            _this.persist({
              guestToken: null,
              orderId: null
            });
            _this.trigger('serverError', error);
            return error;
          }
        ).finally(function() {
          resolve();
        });
      } else {
        resolve();
      }
    });
  },

  /**
    The token used to Authenticate the current user against the current order.  Persisted
    to local storage via `spree-ember-core/mixins/storable`.  This property is
    sent to the Spree server via the header `X-Spree-Order-Token`.

    @property guestToken
    @type String
    @readOnly
    @default null
  */
  guestToken: null,

  /**
    The user's Current Order number, persisted to local storage via
    `spree-ember-core/mixins/storable`.  This property is sent to the Spree
    server via the header `X-Spree-Order-Id`.

    @property orderId
    @type String
    @readOnly
    @default null
  */
  orderId: null,
  
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
    A reference to the Stateful Checkouts service.

    @property checkouts
    @type Ember.Service
  */
  checkouts: Ember.inject.service('checkouts'),

  /**
    Adds a lineItem to the currentOrder. If there is no Current Order,
    Spree Ember will request a new order from the server, and set it as the
    Current Order on the Spree service.

    @method addToCart
    @param {DS.Model} variant A class of the variant model
    @param {Integer} quantity Optional, A quantity for the Line Item.
    @return {Ember.RSVP.Promise} A promise that resolves to the newly saved Line Item.
  */
  addToCart: function(variant, quantity) {
    var _this        = this;
    var currentOrder = this.get('currentOrder');
    quantity = quantity || 1;

    if (currentOrder) {
      return _this._saveLineItem(variant, quantity, currentOrder);
    } else {
      return this._createNewOrder().then(
        function(currentOrder) {
          return _this._saveLineItem(variant, quantity, currentOrder);
        },
        function(error) {
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
        _this.get('checkouts').transition(newOrder.get('state'));
        return newOrder;
      },
      function(error) {
        _this.trigger('newOrderCreateFailed', error);
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
  clearCurrentOrder: function(didComplete) {
    if (didComplete) {
      this.trigger('currentOrderDidComplete', this.get('currentOrder'));
    }
    this.persist({
      guestToken: null,
      orderId: null
    });
    this.set('currentOrder', null);
    this.get('checkouts').transition();
    this.trigger('didClearCurrentOrder');
    return true;
  }
});
