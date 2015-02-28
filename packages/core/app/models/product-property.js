import DS from 'ember-data';

export default DS.Model.extend({
  presentation: DS.attr('string'),
  propertyName: DS.attr('string'),
  value:        DS.attr('string'),

  // Relationships
  product: DS.belongsTo('product')
});
