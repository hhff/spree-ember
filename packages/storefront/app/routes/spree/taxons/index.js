import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    return this.spree.store.find('product', {taxon_id: params.taxon_id});
  }
});
