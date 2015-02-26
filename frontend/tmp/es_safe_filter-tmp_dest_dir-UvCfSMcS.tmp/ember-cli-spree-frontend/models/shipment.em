`import DS from "ember-data"`

class Shipment extends DS.Model
  tracking: DS.attr 'string'
  number: DS.attr 'string'
  cost: DS.attr 'number'
  shippedAt: DS.attr 'date'
  state: DS.attr 'string'

  order: DS.belongsTo 'order'
  stockLocation: DS.belongsTo 'stockLocation'
  shippingRates: DS.hasMany 'shippingRate'

`export default Shipment`