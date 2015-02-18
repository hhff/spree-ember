import Ember from 'ember';

// Spree Events:

// didAddToCart
// didCreateNewOrder
// didLoadCurrentOrder
// didSaveLineItem
// spreeError
// didUpdateCurrentOrder
// orderStateDidChange

export default Ember.Object.extend(Ember.Evented, {
  guestToken: null,
  orderId: null,
  localStorageKey: "spree_ember",

  init: function() {
    this.restore(this.localStorageData());
  },

  currentOrder: Ember.computed('orderId', function() {
    var _this = this;
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

  // TODO - Abstract Local Storage Functions to Mixin
  persist: function(data) {
    var key = this.get('localStorageKey');
    this.restore(data);
    var data = JSON.stringify(data || {})
    localStorage.setItem(key, data);
    return true;
  },

  restore: function(data) {
    for (var key in data) {
      this.set(key, data[key]);
    }
    return true;
  },

  localStorageData: function() {
    var data   = localStorage.getItem(this.get('localStorageKey'));
    var parsed = JSON.parse(data || "{}");
    return parsed;
  },

  // Functions
  addToCart: function(variant, quantity) {
    var _this = this;
    var currentOrderPromise = this.get('currentOrder') || this._createNewOrder();
    return currentOrderPromise.then(
      function(currentOrder) {
        _this.trigger('didLoadCurrentOrder', currentOrder);
        return _this._saveLineItem(variant, quantity);
      },
      function(error) {
        _this.trigger('spreeError', error);
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
          _this.trigger('spreeError', error);
          return error;
        }
      )
    } else {
      return Ember.RSVP.Promise(function(resolve, reject){
        reject("No Current Order to Update.");
      });
    }
  },

  _saveLineItem: function(variant, quantity) {
    var _this = this;
    var newLineItem = this.store.createRecord('lineItem', {
      variant: variant,
      quantity: quantity
    });

    var promise = newLineItem.save();
    return promise.then(
      function(lineItem) {
        _this.trigger('didSaveLineItem', lineItem);
      },
      function(error) {
        _this.trigger('spreeError', error);
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
        _this.trigger('spreeError', error);
      }
    );
  },

  _attemptOrderStateAdvance: function(order) {
    var _this = this;

    // TODO Spree should have its own adapter & store
    var originalState = order.get('state');
    var adapter       = this.get('container').lookup('adapter:application');
    var nextURL       = adapter.buildURL('checkout', order.get('id'))+"/next.json"

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
          _this.trigger('couldNotAdvanceOrder', error);
          debugger
          return error;
        }
      )
    } else {
      return Ember.RSVP.Promise(function(resolve, reject){
        reject("Order can not advance.");
      });
    }
  }

});




