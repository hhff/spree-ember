import DS from 'ember-data';

export default DS.Model.extend({
  number:            DS.attr('string', { persistToServer: true }),
  month:             DS.attr('number', { persistToServer: true }),
  year:              DS.attr('number', { persistToServer: true }),
  verificationValue: DS.attr('number', { persistToServer: true }),
  name:              DS.attr('string', { persistToServer: true }),
  ccType:            DS.attr('string'),
  lastDigits:        DS.attr('string'),

  // Relationships
  paymentMethod: DS.belongsTo('paymentMethod')

  // TODO - These will be models eventually
  // :gateway_customer_profile_id
  // :gateway_payment_profile_id
});
