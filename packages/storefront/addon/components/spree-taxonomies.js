import Ember from 'ember';
import layout from '../templates/components/spree-taxonomies';
/**
  A sidebar style panel for Spree's top-level taxonomy tree.

  **To Override:** You'll need to run the components generator:

  ```bash
  ember g spree-ember-storefront-components
  ```

  This will install all of the Spree Ember Storefront component files into your
  host application at `app/components/spree-*.js`, ready to be extended or
  overriden.

  @class SpreeTaxonomies
  @namespace Component
  @extends Ember.Component
*/
export default Ember.Component.extend({
  layout: layout
});
