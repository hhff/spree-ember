class UsersNewRoute extends Ember.Route
  model: ->
    @store.createRecord 'user'

`export default UsersNewRoute;`