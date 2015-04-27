import Ember from 'ember';

export default Ember.Route.extend({
  redirect: function(model) {
    var currentOrder = this.spree.get('currentOrder');

    if (currentOrder) {
      switch(currentOrder.get('state')) {
        case 'cart':
          this.transitionTo('spree.cart');
          break;
        case 'complete':
          this.transitionTo('spree.orders.show', currentOrder);
          break;
      }
    } else {
      this.transitionTo('spree.products.index');
    }
  },

  actions: {
    transitionCheckoutState: function(state) {
      var _this = this;
      this.spree.get('checkouts').transition(state).finally(function() {
        _this.redirect();
      });
    }
  }
});
