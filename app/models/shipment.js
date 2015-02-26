import DS from 'ember-data';

export default DS.Model.extend({
  // Attributes
  tracking:  DS.attr('string'),
  number:    DS.attr('string'),
  cost:      DS.attr('number'),
  shippedAt: DS.attr('date'),
  state:     DS.attr('string'),

  // Relationships
  order:                DS.belongsTo('order'),
  stockLocation:        DS.belongsTo('stockLocation'),
  shippingRates:        DS.hasMany('shippingRate'),
  selectedShippingRate: DS.belongsTo('shippingRate', { persistToServer: true }),
  lineItems:            DS.hasMany('lineItem')
});