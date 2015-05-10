import Ember from 'ember';
/**
  The checkout route.

  **To Override:** You'll need to run the routes generator:

  ```bash
  ember g spree-ember-storefront-routes
  ```

  This will install all of the Spree Ember Storefront route files into your
  host application at `app/routes/spree/*.js`, ready to be extended or
  overriden.

  @class Checkout
  @namespace Route
  @extends Ember.Component
*/
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
