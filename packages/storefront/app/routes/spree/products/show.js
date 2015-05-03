import Ember from 'ember';

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
