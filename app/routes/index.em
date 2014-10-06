class IndexRoute extends Ember.Route

  model: ->
    Ember.RSVP.hash
      products: @store.find 'product'

`export default IndexRoute`