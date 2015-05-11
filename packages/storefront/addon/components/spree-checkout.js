import Ember from 'ember';
import layout from '../templates/components/spree-checkout';
/**
  A single page checkout that reactively responds to changes in the 
  `spree.checkouts` service.

  **To Override:** You'll need to run the components generator:

  ```bash
  ember g spree-ember-storefront-components
  ```

  This will install all of the Spree Ember Storefront component files into your
  host application at `app/components/spree-*.js`, ready to be extended or
  overriden.

  @class SpreeCheckout
  @namespace Component
  @extends Ember.Component
*/
export default Ember.Component.extend({
  layout: layout,
  action: 'transitionCheckoutState',

  actions: {
    transitionCheckoutState: function(stateName) {
      this.sendAction('action', stateName);
    }
  }
});
