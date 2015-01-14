`import DS from "ember-data"`

class ShippingMethod extends DS.Model
  name: DS.attr 'string'

  zones: DS.hasMany 'zone'
  shippingCategories: DS.hasMany 'shippingCategory'

`export default ShippingMethod`