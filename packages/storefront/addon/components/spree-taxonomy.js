import Ember from 'ember';
import layout from '../templates/components/spree-taxonomy';
export default Ember.Component.extend({
  layout: layout,
  childTaxons: Ember.computed('taxonomy.taxons', function(){
    var taxons = this.get('taxonomy.taxons');
    var parentTaxon = taxons.findBy('parentId', null);
    var childTaxons = taxons.filter(function(taxon){
      return taxon.get('parentId') === parentTaxon.get('id');
    });
    return childTaxons;
  })
});
