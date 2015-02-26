import Ember from 'ember';
import DS from 'ember-data';

export default DS.ActiveModelSerializer.extend({
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
