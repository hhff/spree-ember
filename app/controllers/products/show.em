class ProductsShowController extends Ember.Controller
  quantity: 1

  actions:
    addToCart: ->

      variant = @model.variantsIncludingMaster.firstObject

      newLineItem = @store.createRecord 'lineItem',
        quantity: 1
        variant: variant

      newLineItem.save()


`export default ProductsShowController`