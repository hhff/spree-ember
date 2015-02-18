import DS from 'ember-data';

export default DS.Model.extend({
  // Attribues
  additionalTaxTotal:    DS.attr('number'),    // Read Only
  adjustmentTotal:       DS.attr('number'),    // Read Only
  // approvedAt: null
  // approverId: null
  channel:               DS.attr('string'),    // Read Only
  checkoutSteps:         DS.attr('array'),   // Read Only
  completedAt:           DS.attr('date'),  // Read Only
  confirmationDelivered: DS.attr('boolean'),
  consideredRisky:       DS.attr('boolean'),
  createdAt:             DS.attr('date'),  // Read Only
  // createdById: null
  currency:              DS.attr('string'),    // Read Only
  email:                 DS.attr('string'),
  guestToken:            DS.attr('string'),    // Read Only
  includedTaxTotal:      DS.attr('number'),    // Read Only
  itemCount:             DS.attr('number'),    // Read Only
  itemTotal:             DS.attr('number'),    // Read Only
  // lastIpAddress: null
  number:                DS.attr('string'),    // Read Only
  // paymentState: null
  paymentTotal:          DS.attr('number'),    // Read Only
  promoTotal:            DS.attr('number'),    // Read Only
  // shipmentState: null
  shipmentTotal:         DS.attr('number'),    // Read Only
  specialInstructions:   DS.attr('string'),
  state:                 DS.attr('string'),    // Read Only
  total:                 DS.attr('number'),    // Read Only
  updatedAt:             DS.attr('date'),  // Read Only

  // Relationships
  billAddress:    DS.belongsTo('address'),
  shipAddress:    DS.belongsTo('address'),
  lineItems:      DS.hasMany('lineItem'),
  shipments:      DS.hasMany('shipment'),
  shippingMethod: DS.belongsTo('shippingMethod'),

  // Computed
  empty: Ember.computed('itemCount', function() {
    return this.get('itemCount') === 0;
  }),

  hasEmail: Ember.computed('email', function() {
    return this.get('email.length') > 0;
  }),

  canAdvance: Ember.computed(function() {
    return true;
  })

});