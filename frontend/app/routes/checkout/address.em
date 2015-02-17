`import SpreeRouteSetup from 'ember-cli-spree-frontend/mixins/route-setup'`

class CheckoutAddressRoute extends Ember.Route with SpreeRouteSetup

  setupController: (controller, model) ->
    super controller, model
    controller.billAddress = model.billAddress or @store.createRecord 'address'
    controller.shipAddress = model.shipAddress or @store.createRecord 'address'
    controller.countries = @store.find 'country'

`export default CheckoutAddressRoute`