`import DS from "ember-data"`

class Zone extends DS.Model
  name: DS.attr 'string'
  description: DS.attr 'string'


`export default Zone`