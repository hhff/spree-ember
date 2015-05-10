import Ember from 'ember';
/**
  The Products Index Page.

  **To Override:** You'll need to run the routes generator:

  ```bash
  ember g spree-ember-storefront-routes
  ```

  This will install all of the Spree Ember Storefront route files into your
  host application at `app/routes/spree/*.js`, ready to be extended or
  overriden.

  @class ProductsIndex
  @namespace Route
  @extends Ember.Component
*/
export default Ember.Route.extend({
  model: function() {
    return Ember.RSVP.hash({
      products: this.spree.store.find('product'),
      taxonomies: this.spree.store.find('taxonomy')
    });
  }
});
