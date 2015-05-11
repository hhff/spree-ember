import Ember from 'ember';
import layout from '../templates/components/spree-grid';
/**
  A Product Grid for the Products Index and Taxons Show routes.

  **To Override:** You'll need to run the components generator:

  ```bash
  ember g spree-ember-storefront-components
  ```

  This will install all of the Spree Ember Storefront component files into your
  host application at `app/components/spree-*.js`, ready to be extended or
  overriden.

  @class SpreeGrid
  @namespace Component
  @extends Ember.Component
*/
export default Ember.Component.extend({
  layout: layout
});
