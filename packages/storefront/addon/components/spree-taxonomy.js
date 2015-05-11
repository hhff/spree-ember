import Ember from 'ember';
import layout from '../templates/components/spree-taxonomy';
/**
  An item from the Spree Taxonomies side bar component.

  **To Override:** You'll need to run the components generator:

  ```bash
  ember g spree-ember-storefront-components
  ```

  This will install all of the Spree Ember Storefront component files into your
  host application at `app/components/spree-*.js`, ready to be extended or
  overriden.

  @class SpreeTaxonomy
  @namespace Component
  @extends Ember.Component
*/
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
