import Ember from 'ember';
import layout from '../templates/components/spree-input';

export default Ember.Component.extend({
  layout: layout,

  displayErrors: Ember.computed('errors.@each', function() {
    var errors = this.get('errors') || [];
    var attributeName = this.get('attributeName');
    
    var namedErrors = errors.map(function(error) {
      return attributeName ? attributeName  + " " + error.message : error.attribute + " " + error.message ; 
    });
    
    return namedErrors.join(', ') + ".";
  })
});
