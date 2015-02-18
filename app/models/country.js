import DS from 'ember-data';

export default DS.Model.extend({
  // Attributes
  isoName:        DS.attr('string'),
  iso:            DS.attr('string'),
  iso3:           DS.attr('string'),
  name:           DS.attr('string'),
  numcode:        DS.attr('number'),
  statesRequired: DS.attr('boolean'),

  // Relationships
  states: DS.hasMany('state'),

  // Computed
  hasStates: Ember.computed('states', function() {
    return this.get('states.length') > 0;
  })
});