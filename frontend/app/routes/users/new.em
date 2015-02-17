`import SpreeRouteSetup from 'ember-cli-spree-frontend/mixins/route-setup'`
class UsersNewRoute extends Ember.Route with SpreeRouteSetup
  model: ->
    @store.createRecord 'user'

`export default UsersNewRoute;`