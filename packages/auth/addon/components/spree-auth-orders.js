import Ember from 'ember';
import layout from '../templates/components/spree-auth-orders';
/**
 A order list for the Spree Auth Account Route.

 **To Override:** You'll need to run the components generator:

 ```bash
 ember g spree-ember-auth-components
 ```

 This will install all of the Spree Ember Auth component files into your
 host application at `app/components/spree-*.js`, ready to be extended or
 overriden.

 @class SpreeAuthOrders
 @namespace Component
 @extends Ember.Component
 */
export default Ember.Component.extend({
  layout: layout
});
