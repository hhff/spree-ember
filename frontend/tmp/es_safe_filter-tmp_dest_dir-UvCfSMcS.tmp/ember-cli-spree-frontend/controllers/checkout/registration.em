`import LoginControllerMixin from 'simple-auth/mixins/login-controller-mixin'`

class CheckoutRegistrationController extends Ember.Controller with LoginControllerMixin
  authenticator: 'simple-auth-authenticator:devise'

  actions:
    continueAsGuest: ->
      @spree.currentOrder.email = @guestEmail
      @spree.saveCurrentOrder()

`export default CheckoutRegistrationController`