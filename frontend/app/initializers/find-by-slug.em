`import DS from "ember-data"`

Initializer =
  name: 'find-by-slug'
  initialize: (container, application) ->
    DS.Store.reopen

      findBySlug: (type, slug, preload) ->
        Ember.assert "You need to pass a type to the store's findBySlug method", arguments.length >= 1
        Ember.assert "You need to pass a slug to the store's findBySlug method", arguments.length >= 2

        store      = @
        type       = @modelFor type
        adapter    = @adapterFor type
        serializer = @serializerFor type

        promise    = adapter.find store, type, slug, null

        promise.then(
          (adapterPayload) ->
            payload = serializer.extract store, type, adapterPayload, slug, 'find'
            store.push type, payload
          (error) ->
            throw error
        )

`export default Initializer`
