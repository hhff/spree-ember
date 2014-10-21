class ProductsShowController extends Ember.Controller
  quantity: 1

  actions:
    addToCart: ->
      order = @store.createRecord 'order'
      order.save().then(
        (order) =>
          debugger
      )

`export default ProductsShowController`