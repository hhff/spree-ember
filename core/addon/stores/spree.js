import DS from 'ember-data';

export default DS.Store.extend({
  adapter: '-spree',
  adapterFor: function(type) {
    return this.container.lookup('adapter:-spree');
  },
  serializerFor: function(type) {
    return this.container.lookup('serializer:-spree');
  }
});