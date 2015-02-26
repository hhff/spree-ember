`import SpreeRouteSetup from 'ember-cli-spree-frontend/mixins/route-setup'`

class CartRoute extends Ember.Route with SpreeRouteSetup

  model: ->
    @spree.currentOrder

`export default CartRoute`