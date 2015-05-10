import Ember from 'ember';
import layout from '../templates/components/spree-lineitems';
/**
  A table for listing the Line Items in an order.  Used on the Cart, Checkouts
  confirmation, and Orders show routes.

  **To Override:** You'll need to run the components generator:

  ```bash
  ember g spree-ember-storefront-components
  ```

  This will install all of the Spree Ember Storefront component files into your
  host application at `app/components/spree-*.js`, ready to be extended or
  overriden.

  @class SpreeLineitems
  @namespace Component
  @extends Ember.Component
*/
export default Ember.Component.extend({
  layout: layout,
  action: 'deleteLineItem',

  actions: {
    deleteLineItem: function(lineItem) {
      this.sendAction('action', lineItem);
      return false;
    }
  }
});
