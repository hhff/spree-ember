import Ember from 'ember';
/**
  The cart route.

  **To Override:** You'll need to run the routes generator:

  ```bash
  ember g spree-ember-storefront-routes
  ```

  This will install all of the Spree Ember Storefront route files into your
  host application at `app/routes/spree/*.js`, ready to be extended or
  overriden.

  @class Cart 
  @namespace Route
  @extends Ember.Component
*/
export default Ember.Route.extend({
  actions: {
    deleteLineItem: function(lineItem) {
      var currentOrder = this.spree.get('currentOrder');
      lineItem.destroyRecord().finally(function() {
          currentOrder.reload();
      });
    },

    transitionToCheckout: function() {
      if (this.spree.get('currentOrder.state') !== 'cart') {
        this.transitionTo('spree.checkout');
      } else {
        var _this = this;
        this.spree.get('checkouts').transition().finally(function() {
          _this.transitionTo('spree.checkout');
        });
      }
    }
  }
});
