`import DS from "ember-data"`

class Order extends DS.Model
  additionalTaxTotal: DS.attr 'number', { readOnly: true }
  adjustmentTotal: DS.attr 'number', { readOnly: true }
  # approvedAt: null
  # approverId: null
  channel: DS.attr 'string', { readOnly: true }
  checkoutSteps: DS.attr 'array', { readOnly: true }
  completedAt: DS.attr 'date', { readOnly: true }
  confirmationDelivered: DS.attr 'boolean'
  consideredRisky: DS.attr 'boolean', { readOnly: true }
  createdAt: DS.attr 'date', { readOnly: true }
  # createdById: null
  currency: DS.attr 'string', { readOnly: true }
  email: DS.attr 'string'
  guestToken: DS.attr 'string', { readOnly: true }
  includedTaxTotal: DS.attr 'number', { readOnly: true }
  itemCount: DS.attr 'number', { readOnly: true }
  itemTotal: DS.attr 'number', { readOnly: true }
  # lastIpAddress: null
  number: DS.attr 'string', { readOnly: true }
  # paymentState: null
  paymentTotal: DS.attr 'number', { readOnly: true }
  promoTotal: DS.attr 'number', { readOnly: true }
  # shipmentState: null
  shipmentTotal: DS.attr 'number', { readOnly: true }
  specialInstructions: DS.attr 'string'
  state: DS.attr 'string', { readOnly: true }
  total: DS.attr 'number', { readOnly: true }
  updatedAt: DS.attr 'date', { readOnly: true }

  billAddress: DS.belongsTo 'address'
  shipAddress: DS.belongsTo 'address'
  lineItems: DS.hasMany 'lineItem'
  shipments: DS.hasMany 'shipment'
  shippingMethod: DS.belongsTo 'shippingMethod'

  +computed itemCount
  empty: ->
    @itemCount is 0

  +computed email
  hasEmail: ->
    @email.length > 0 if @email

  +computed state
  notConfirm: ->
    @state is not "confirm"

`export default Order`