class ProductsShowController extends Ember.Controller
  quantity: 1

  actions:
    addToCart: ->

      # todo source from PDP
      lineItem = @store.createRecord 'lineItem',
        quantity: @quantity
        variant: @model.variantsIncludingMaster.firstObject

      if @spree.currentOrder
        lineItem.save().then(
          (lineItem) =>
            @flash.pushFlash 'Item Added to Cart!',
              type: 'success'
          (error) =>
            @flash.pushFlash error,
              type: 'error'
        )
      else
        @store.createRecord('order').save().then(
          (order) =>
            @spree.persist
              guestToken: order.guestToken
              orderId: order.id
            lineItem.save().then(
              (lineItem) =>
                @flash.pushFlash 'Item Added to Cart!',
                  type: 'success'
              (error) =>
                @flash.pushFlash error,
                  type: 'error'
            )
          (error) =>
            @flash.pushFlash error,
              type: 'error'
        )

`export default ProductsShowController`