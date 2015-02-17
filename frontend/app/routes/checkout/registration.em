`import SpreeRouteSetup from 'ember-cli-spree-frontend/mixins/route-setup'`

class CheckoutRegistrationRoute extends Ember.Route with SpreeRouteSetup

  model: ->
    @spree.currentOrder

`export default CheckoutRegistrationRoute`