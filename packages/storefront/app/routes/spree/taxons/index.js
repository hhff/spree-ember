import Ember from 'ember';

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
