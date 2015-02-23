import Ember from 'ember';
import Storable from '../mixins/storable';
import ActsAsEventBus from '../mixins/acts-as-event-bus';
import Checkouts from '../mixins/checkouts';

// Spree Events:

// spree.didAddToCart
// spree.didCreateNewOrder
// spree.didSaveLineItem
// spree.serverError
// spree.didUpdateCurrentOrder
// spree.orderStateDidChange

export default Ember.Object.extend(Ember.Evented, Storable, ActsAsEventBus, Checkouts, {
  guestToken: null,
  orderId: null,
  currentPath: null,
  localStorageKey: "spree_ember",

  currentOrder: Ember.computed('orderId', function() {
    var _this   = this;
    var orderId = this.get('orderId');
    if (orderId) {
      var promise = this.store.find('order', orderId)
      promise.catch(function(error) {
        _this.persist({
          orderId: null
        });
      })
      return promise;
    } else {
      return null;
    }
  }),

  // Functions
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
    )
  },

  updateCurrentOrder: function(attemptAdvance) {
    var _this = this;
    if (this.get('currentOrder')) {
      var currentOrderPromise = this.get('currentOrder');

      return currentOrderPromise.then(
        function(currentOrder) {
          return currentOrder.save().then(
            function(updatedCurrentOrder) {
              _this.trigger('didUpdateCurrentOrder', updatedCurrentOrder);
              if (attemptAdvance) {
                return _this._attemptOrderStateAdvance(updatedCurrentOrder);
              } else {
                return updatedCurrentOrder;
              }
            }
          )
        },
        function(error) {
          _this.trigger('serverError', error);
          return error;
        }
      )
    } else {
      return Ember.RSVP.Promise(function(resolve, reject){
        reject("No Current Order to Update.");
      });
    }
  },

  // Order is optional - quantity is optional
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
        _this.trigger('didSaveLineItem', lineItem);
        return lineItem;
      },
      function(error) {
        _this.trigger('serverError', error);
        debugger;
        return error;
      }
    )
  },

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
        _this.trigger('serverError', error);
      }
    );
  },

  _attemptOrderStateAdvance: function(order) {
    var _this = this;

    // TODO Spree should have its own adapter & store
    var originalState = order.get('state');
    var adapter       = this.get('container').lookup('adapter:application');
    var nextURL       = adapter.buildURL('checkout', order.get('id'))+"/next.json"

    // TODO - Client side validation
    if (order.get('canAdvance')) {
      return adapter.ajax(nextURL, 'PUT').then(
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
    } else {
      return Ember.RSVP.Promise(function(resolve, reject){
        reject("Spree: Order can not advance.");
      });
    }
  }

});




