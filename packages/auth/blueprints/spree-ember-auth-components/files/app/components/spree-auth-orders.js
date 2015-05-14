import Ember from 'ember';
import layout from '../templates/components/spree-auth-orders';
/**
 A order list for the Spree Account Route.

 **To Override:** You'll need to run the components generator:

 ```bash
 ember g spree-ember-auth-components
 ```

 This will install a layout file at: `app/templates/components/spree-auth`, and
 a component file at `app/components/spree-auth`, ready to be extended.

 @class SpreeAccountOrders
 @namespace Component
 @extends Ember.Component
 */
export default Ember.Component.extend({
  layout: layout
});
