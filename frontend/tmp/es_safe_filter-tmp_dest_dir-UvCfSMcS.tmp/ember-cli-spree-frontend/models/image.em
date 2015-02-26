`import DS from "ember-data"`

class Image extends DS.Model
  alt: DS.attr 'string'
  miniUrl: DS.attr 'string'
  smallUrl: DS.attr 'string'
  productUrl: DS.attr 'string'
  largeUrl: DS.attr 'string'

`export default Image`