import Ember from 'ember';
/**
  The Orders Show Route.

  **To Override:** You'll need to run the routes generator:

  ```bash
  ember g spree-ember-storefront-routes
  ```

  This will install all of the Spree Ember Storefront route files into your
  host application at `app/routes/spree/*.js`, ready to be extended or
  overriden.

  @class OrdersShow
  @namespace Route
  @extends Ember.Component
*/
export default Ember.Route.extend({
  model: function(params) {
    var _this = this;
    return this.spree.store.find('order', params.id).catch(function() {
      _this.transitionTo('spree.products.index');
    });
  },
  afterModel: function(model) {
    if (this.spree.get('currentOrder') === model) {
      this.spree.clearCurrentOrder();
    }
  },
  redirect: function(model) {
    if (model.get('state') !== 'complete') {
      this.redirectTo('spree.checkout');
    }
  }
});
