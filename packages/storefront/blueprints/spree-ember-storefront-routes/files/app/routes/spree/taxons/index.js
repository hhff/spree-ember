import Ember from 'ember';
/**
  The Taxons Index route.

  **To Override:** You'll need to run the routes generator:

  ```bash
  ember g spree-ember-storefront-routes
  ```

  This will install all of the Spree Ember Storefront route files into your
  host application at `app/routes/spree/*.js`, ready to be extended or
  overriden.

  @class TaxonsIndex
  @namespace Route
  @extends Ember.Component
*/
export default Ember.Route.extend({
  model: function(params) {
    return Ember.RSVP.hash({
      products: this.spree.store.find('product', { taxon_id: params.taxon_id }),
      taxon: this.spree.store.find('taxon').then(function(taxons) {
        return taxons.findBy('permalink', params.taxon_id)
      })
    })
  }
});
