`import DS from "ember-data"`

class Order extends DS.Model
  number: DS.attr 'string', { exclude: true }
  itemTotal: DS.attr 'number'
  total: DS.attr 'number'
  shipTotal: DS.attr 'number'
  state: DS.attr 'string'
  adjustmentTotal: DS.attr 'number'
  paymentTotal: DS.attr 'number'
  shipmentState: DS.attr 'string'
  paymentState: DS.attr 'string'
  email: DS.attr 'string'
  specialInstructions: DS.attr 'string'
  channel: DS.attr 'string'
  includedTaxTotal: DS.attr 'number'
  additionalTaxTotal: DS.attr 'number'
  displayIncludedTaxTotal: DS.attr 'string'
  displayAdditionalTaxTotal: DS.attr 'string'
  currency: DS.attr 'string'
  displayItemTotal: DS.attr 'string'
  displayTotal: DS.attr 'string'
  displayShipTotal: DS.attr 'string'
  displayTaxTotal: DS.attr 'string'
  token: DS.attr 'string'

`export default Order`