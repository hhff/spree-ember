import DS from 'ember-data';

export default DS.Model.extend({
  // Attributes
  quantity:            DS.attr('number', { persistToServer: true }),
  singleDisplayAmount: DS.attr('string'),
  insufficientStock:   DS.attr('boolean'),
  price:               DS.attr('number'),
  total:               DS.attr('number'),
  displayAmount:       DS.attr('string'),

  // Relationships
  order:   DS.belongsTo('order'),
  variant: DS.belongsTo('variant', { persistToServer: true })
});