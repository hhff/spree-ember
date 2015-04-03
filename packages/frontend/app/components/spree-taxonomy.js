import Ember from 'ember';

export default Ember.Component.extend({
    childTaxons: function(){
        var taxons = this.get('taxonomy.taxons');
        var parentTaxon = taxons.findBy('parentId', null)
        var childTaxons = taxons.filter(function(taxon){
            return taxon.get('parentId') == parentTaxon.get('id');
        });
        return childTaxons;
    }.property('taxonomy.taxons')
});
