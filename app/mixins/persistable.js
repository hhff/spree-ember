import Ember from 'ember';

export default Ember.Mixin.create({
  serialize: function(record, options) {
    var payload = this._super.apply(this, arguments);
    record.eachAttribute(function(name, meta) {
      if (!meta.options.persistToServer) {
        delete payload[Ember.String.underscore(name)];
      }
    }, this);
    return payload;
  }
});