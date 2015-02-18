import DS from 'ember-data';

export default DS.Model.extend({
  // Attributes
  quantity:            DS.attr('number'),
  singleDisplayAmount: DS.attr('string'), // TODO - Read Only
  insufficientStock:   DS.attr('boolean'), // TODO - Read Only
  price:               DS.attr('number'),
  total:               DS.attr('number'),

  // Relationships
  variant: DS.belongsTo('variant')
});
