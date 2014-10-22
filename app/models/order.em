`import DS from "ember-data"`

class Order extends DS.Model
  additionalTaxTotal: DS.attr 'number'
  adjustmentTotal: DS.attr 'number'
  # approvedAt: null
  # approverId: null
  # billAddressId: null
  channel: DS.attr 'string'
  completedAt: DS.attr 'date'
  confirmationDelivered: DS.attr 'boolean'
  consideredRisky: DS.attr 'boolean'
  createdAt: DS.attr 'date'
  # createdById: null
  currency: DS.attr 'string'
  email: DS.attr 'string'
  guestToken: DS.attr 'string'
  includedTaxTotal: DS.attr 'number'
  itemCount: DS.attr 'number'
  itemTotal: DS.attr 'number'
  # lastIpAddress: null
  lineItems: DS.hasMany 'lineItem'
  number: DS.attr 'string', { readOnly: true }
  # paymentState: null
  paymentTotal: DS.attr 'number'
  promoTotal: DS.attr 'number'
  # shipAddressId: null
  # shipmentState: null
  shipmentTotal: DS.attr 'number'
  # shippingMethodId: null
  specialInstructions: DS.attr 'string'
  state: DS.attr 'string'
  total: DS.attr 'number'
  updatedAt: DS.attr 'date'

  +computed itemCount
  empty: ->
    @itemCount is 0

`export default Order`