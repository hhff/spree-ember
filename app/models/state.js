import DS from 'ember-data';

export default DS.Model.extend({
  // Attributes
  name: DS.attr('string'),
  abbr: DS.attr('string'),

  // Relationships
  country: DS.belongsTo('country')
});
