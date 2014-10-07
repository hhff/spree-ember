`import DS from "ember-data"`

class Product extends DS.Model
  name: DS.attr 'string'
  description: DS.attr 'string'
  price: DS.attr 'number'
  displayPrice: DS.attr 'string'
  slug: DS.attr 'string'

  images: DS.hasMany 'image'
  variantsIncludingMaster: DS.hasMany 'variant'
  productProperties: DS.hasMany 'productProperty'

`export default Product`
