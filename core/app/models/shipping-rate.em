`import DS from "ember-data"`

class ShippingRate extends DS.Model
  name: DS.attr 'string'
  cost: DS.attr 'number'
  selected: DS.attr 'boolean'
  displayCost: DS.attr 'string'

  shippingMethod: DS.belongsTo 'shippingMethod'

`export default ShippingRate`