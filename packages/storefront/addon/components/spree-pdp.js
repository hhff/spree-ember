import Ember from 'ember';
import layout from '../templates/components/spree-pdp';
/**
  The Spree Product Display Page.

  **To Override:** You'll need to run the components generator:

  ```bash
  ember g spree-ember-storefront-components
  ```

  This will install all of the Spree Ember Storefront component files into your
  host application at `app/components/spree-*.js`, ready to be extended or
  overriden.

  @class SpreePdp
  @namespace Component
  @extends Ember.Component
*/
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
