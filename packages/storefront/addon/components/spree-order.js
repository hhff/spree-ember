import Ember from 'ember';
import layout from '../templates/components/spree-order';
/**
  An order detail page.  Used on the confirmation checkout step, and the Orders
  show page.

  **To Override:** You'll need to run the components generator:

  ```bash
  ember g spree-ember-storefront-components
  ```

  This will install all of the Spree Ember Storefront component files into your
  host application at `app/components/spree-*.js`, ready to be extended or
  overriden.

  @class SpreeOrder
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
