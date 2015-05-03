import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    deleteLineItem: function(lineItem) {
      var currentOrder = this.spree.get('currentOrder');
      lineItem.destroyRecord().then(
        function() {
          currentOrder.reload();
        }
      );
    },

    transitionToCheckout: function() {
      if (this.spree.get('currentOrder.state') !== 'cart') {
        this.transitionTo('spree.checkout');
      } else {
        var _this = this;
        this.spree.get('checkouts').transition().then(
          function() {
            _this.transitionTo('spree.checkout');
          },
          function() {
            debugger;
          }
        );
      }
    }
  }
});
