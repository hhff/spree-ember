import DS from 'ember-data';

export default DS.Model.extend({
  number:            DS.attr('string'),
  month:             DS.attr('number'),
  year:              DS.attr('number'),
  verificationValue: DS.attr('number'),
  name:              DS.attr('string'),
  ccType:            DS.attr('string'),
  lastDigits:        DS.attr('string'),

  // Relationships
  paymentMethod: DS.belongsTo('paymentMethod')

  // TODO - These will be models eventually
  // :gateway_customer_profile_id
  // :gateway_payment_profile_id
});
