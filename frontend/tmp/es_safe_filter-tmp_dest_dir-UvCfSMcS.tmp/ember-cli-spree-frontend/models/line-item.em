`import DS from "ember-data"`

class LineItem extends DS.Model
  variant: DS.belongsTo 'variant'
  quantity: DS.attr 'number'
  singleDisplayAmount: DS.attr 'string', { readOnly: true }
  insufficientStock: DS.attr 'boolean', { readOnly: true }
  price: DS.attr 'number'
  total: DS.attr 'number'

`export default LineItem`