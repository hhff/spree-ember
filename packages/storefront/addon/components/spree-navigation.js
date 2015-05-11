import Ember from 'ember';
import layout from '../templates/components/spree-navigation';
/**
  A simple nav bar with cart state, links, and login/account links (if
  `spree-ember-auth` is present).

  **To Override:** You'll need to run the components generator:

  ```bash
  ember g spree-ember-storefront-components
  ```

  This will install all of the Spree Ember Storefront component files into your
  host application at `app/components/spree-*.js`, ready to be extended or
  overriden.

  @class SpreeNavigation
  @namespace Component
  @extends Ember.Component
*/
export default Ember.Component.extend({
  layout: layout
});
