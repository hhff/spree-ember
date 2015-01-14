`import DS from "ember-data"`

class State extends DS.Model
  name: DS.attr 'string'
  abbr: DS.attr 'string'
  country: DS.belongsTo 'country'

`export default State`