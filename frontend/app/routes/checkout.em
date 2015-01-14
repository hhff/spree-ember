class CheckoutRoute extends Ember.Route

  model: ->
    @spree.currentOrder

  redirect: (model, transition) ->
    @transitionTo 'index' unless model

    if model.state is "cart"
      @transitionTo "cart"
    else if model.hasEmail
      @transitionTo "checkout.#{model.state}"
    else
      @transitionTo 'checkout.registration'

`export default CheckoutRoute`

# initial state: cart
# -> address: must have an email
# -> delivery: must have shipping & billing address (if delivery is required)
# -> payment: must have a shipping rate for each shipment (returned when transitioning to delivery step)
# -> confirm: order must have a payment
# -> complete: order must be in confirm state