import Ember from 'ember';
import DS from 'ember-data';

/**
  The Spree Serializer is based on the `DS.ActiveModelSerializer`, but implements
  a stricter `serialize` method.

  @class Serializer
  @namespace SpreeEmber
  @module ember-cli-spree-core/serializers/spree
  @extends DS.ActiveModelSerializer
*/
export default DS.ActiveModelSerializer.extend({
  /**
    Serializes a record for sending to the Spree server.  Here, we extend the
    default behaviour of `DS.ActiveModelSerializer#serialize` to ensure that we
    only persist attributes & relationships that have `persistToServer: true` in
    the model definition.  We also add the `id` to the payload, as we're often
    sending nested models to the server.

    @method serialize
    @param {DS.Model} record A model to serialize.
    @return {Object} A JSON object representing the record.
  */
  serialize: function(record) {
    var payload = this._super.apply(this, arguments);
    record.eachAttribute(function(name, meta) {
      if (!meta.options.persistToServer) {
        delete payload[Ember.String.underscore(name)];
      }
    }, this);
    record.eachRelationship(function(name, meta) {
      if (!meta.options.persistToServer) {
        if (meta.kind === "belongsTo") {
          delete payload[Ember.String.underscore(name)+"_id"];
        } else if (meta.kind === "hasMany") {
          delete payload[Ember.String.underscore(name)+"_ids"];
        }
      }
    }, this);
    payload.id = record.id;
    return payload;
  }
});
