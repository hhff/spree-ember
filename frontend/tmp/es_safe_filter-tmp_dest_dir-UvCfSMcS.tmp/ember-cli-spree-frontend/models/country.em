`import DS from "ember-data"`

class Country extends DS.Model
  isoName: DS.attr 'string'
  iso: DS.attr 'string'
  iso3: DS.attr 'string'
  name: DS.attr 'string'
  numcode: DS.attr 'number'
  statesRequired: DS.attr 'boolean'
  states: DS.hasMany 'state'

  +computed states
  hasStates: ->
    @states.length > 0

`export default Country`


