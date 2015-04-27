import Ember from 'ember';
import layout from '../templates/components/spree-pdp';

export default Ember.Component.extend({
  layout: layout,
  variantSelection: null,
  quantity: 1,
  action: 'addToCart',

  selectedVariant: Ember.computed('product.variants', function() {
    var selection = this.get('variantSelection');
    var variants  = this.get('product.variants');

    if (selection) {
      return selection; 
    } else {
      if (variants && variants.get('length')) {
        return variants.get('firstObject');
      } else {
        return this.get('product.masterVariant');
      }
    }
  }),

  actions: {
    addToCart: function() {
      this.sendAction('action', this.get('selectedVariant'), this.get('quantity'));
    }
  }
});
