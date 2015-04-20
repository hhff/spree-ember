import Ember from 'ember';

export default Ember.Route.extend({
  activate: function() {
    var currentOrder = this.spree.get('currentOrder');
    if (currentOrder) {
      var state = currentOrder.get('state');
      if (state === "cart") {
        this.spree.transitionCheckoutState();
      } else {
        this.transitionTo("spree.checkout."+state);
      }
    } else {
      this.transitionTo('spree.products.index');
    } 
  }
});
