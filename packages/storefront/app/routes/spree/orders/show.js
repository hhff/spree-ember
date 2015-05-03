import Ember from 'ember';

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
