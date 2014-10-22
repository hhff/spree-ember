class CartRoute extends Ember.Route

  model: ->
    @spree.currentOrder

`export default CartRoute`