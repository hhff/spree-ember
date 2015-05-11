import layout from '../templates/components/spree-select';
import SpreeInput from 'spree-ember-storefront/components/spree-input';
/**
  A select component with Label and outlet for validation errors.

  **To Override:** You'll need to run the components generator:

  ```bash
  ember g spree-ember-storefront-components
  ```

  This will install all of the Spree Ember Storefront component files into your
  host application at `app/components/spree-*.js`, ready to be extended or
  overriden.

  @class SpreeSelect
  @namespace Component
  @extends Ember.Component
*/
export default SpreeInput.extend({
  layout: layout
});
