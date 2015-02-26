import DS from 'ember-data';

export default DS.Model.extend({
  // Attributes
  name:        DS.attr('string'),
  cost:        DS.attr('number'),
  selected:    DS.attr('boolean'),
  displayCost: DS.attr('string'),

  // Relationships
  shippingMethod: DS.belongsTo('shippingMethod')
});
