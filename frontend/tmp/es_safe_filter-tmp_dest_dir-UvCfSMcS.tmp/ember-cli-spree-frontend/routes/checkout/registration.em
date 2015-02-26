class CheckoutRegistrationRoute extends Ember.Route

  model: ->
    @spree.currentOrder

`export default CheckoutRegistrationRoute`