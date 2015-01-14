class RegistrationRoute extends Ember.Route

  model: ->
    @spree.currentOrder

`export default RegistrationRoute`