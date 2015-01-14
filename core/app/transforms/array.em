`import DS from "ember-data"`

class ArrayTransform extends DS.Transform
  deserialize: (serialized) ->
    if Ember.isArray serialized
      Ember.A serialized
    else
      Ember.A

  serialize: (deserialized) ->
    if Ember.isArray deserialized
      Ember.A deserialized
    else
      Ember.A

`export default ArrayTransform`