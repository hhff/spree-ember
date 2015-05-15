import DS from 'ember-data';
import HandlesNestedServerErrors from 'spree-ember-core/mixins/handles-nested-server-errors';
import CanCheckout from 'spree-ember-core/mixins/can-checkout';

export default DS.Model.extend(HandlesNestedServerErrors, CanCheckout, {
  // Attribues
  additionalTaxTotal:    DS.attr('number'),
  adjustmentTotal:       DS.attr('number'),
  approvedAt:            DS.attr('date'),
  channel:               DS.attr('string'),
  checkoutSteps:         DS.attr('raw'),
  completedAt:           DS.attr('date'),
  confirmationDelivered: DS.attr('boolean'),
  consideredRisky:       DS.attr('boolean'),
  createdAt:             DS.attr('date'),
  currency:              DS.attr('string'),
  email:                 DS.attr('string', { persistToServer: true }),
  guestToken:            DS.attr('string'),
  includedTaxTotal:      DS.attr('number'),
  itemCount:             DS.attr('number'),
  itemTotal:             DS.attr('number'),
  lastIpAddress:         DS.attr('string'),
  number:                DS.attr('string'),
  paymentState:          DS.attr('string'),
  paymentTotal:          DS.attr('number'),
  promoTotal:            DS.attr('number'),
  shipmentState:         DS.attr('string'),
  shipmentTotal:         DS.attr('number'),
  specialInstructions:   DS.attr('string', { persistToServer: true }),
  state:                 DS.attr('string'),
  total:                 DS.attr('number'),
  updatedAt:             DS.attr('date'),

  // Relationships
  user:                    DS.belongsTo('user'),
  createdBy:               DS.belongsTo('user'),
  approver:                DS.belongsTo('user'),
  billAddress:             DS.belongsTo('address'),
  shipAddress:             DS.belongsTo('address'),
  lineItems:               DS.hasMany('lineItem'),
  shipments:               DS.hasMany('shipment'),
  shippingMethod:          DS.belongsTo('shippingMethod'),
  availablePaymentMethods: DS.hasMany('paymentMethod'),
  payments:                DS.hasMany('payment'),

  // Computed
  empty: Ember.computed('itemCount', function() {
    return this.get('itemCount') === 0;
  }),

  hasEmail: Ember.computed('email', function() {
    return this.get('email.length') > 0;
  }),

  canAdvance: Ember.computed(function() {
    return true;
  }),

  isConfirm: Ember.computed('state', function() {
    return this.get('state') === "confirm";
  }),

  isComplete: Ember.computed('state', function() {
    return this.get('state') === "complete";
  }),

  activePayment: Ember.computed('payments.@each.state', function() {
    return this.get('payments').reject(function(payment) {
      return payment.get('state') === ("invalid" || "void");
    }).get('lastObject');
  })
});
