class CheckoutProgressComponent extends Ember.Component

  +computed checkoutSteps
  stepObjects: ->
    for step in @checkoutSteps
      Ember.Object.create
        name: step
        className: "className-#{step}"

`export default CheckoutProgressComponent`