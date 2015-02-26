`import DS from "ember-data"`

class Address extends DS.Model
  firstname: DS.attr 'string'
  lastname: DS.attr 'string'
  address1: DS.attr 'string'
  address2: DS.attr 'string'
  city: DS.attr 'string'
  zipcode: DS.attr 'string'
  phone: DS.attr 'string'
  stateName: DS.attr 'string'
  alternativePhone: DS.attr 'string'
  company: DS.attr 'string'

  state: DS.belongsTo 'state'
  country: DS.belongsTo 'country'

`export default Address`