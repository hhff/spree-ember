import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    return this.spree.store.findBySlug('product', params.slug);
  },

  setupController: function(controller, model) {
    this._super.apply(this, arguments);

    var variants = model.get('variants');
    if (variants.get('length')) {
      controller.set('selectedVariant', variants.get('firstObject'));
    } else {
      controller.set('selectedVariant', model.get('masterVariant'));
    }
  },

  actions: {
    addToCart: function() {
      var _this    = this;
      var quantity = 1;
      var variant  = this.get('controller.selectedVariant');

      // TODO Quantity
      this.spree.addToCart(variant, quantity).then(
        function(response) {
          var name = variant.get('name');
          _this.notify.success(quantity+"x "+name+' was added to cart.');
          return true;
        },
        function(error) {
          // TODO: Catch this Error
          return true;
        }
      );
    }
  }
});