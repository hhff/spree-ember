import Ember from 'ember';
/**
  The Product PDP (show) route.

  **To Override:** You'll need to run the routes generator:

  ```bash
  ember g spree-ember-storefront-routes
  ```

  This will install all of the Spree Ember Storefront route files into your
  host application at `app/routes/spree/*.js`, ready to be extended or
  overriden.

  @class ProductsShow
  @namespace Route
  @extends Ember.Component
*/
export default Ember.Route.extend({
  model: function(params) {
    return this.spree.store.findBySlug('product', params.slug);
  },

  actions: {
    addToCart: function(variant, quantity) {
      var _this = this;
      this.spree.addToCart(variant, quantity).then(
        function() {
          _this.transitionTo('spree.cart');
        }
      );
    }
  }
});
