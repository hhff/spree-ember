import DS from 'ember-data';

export default DS.Store.extend({
  adapter: '-spree',
  defaultSerializer: '-spree',
  adapterFor: function() {
    return this.container.lookup('adapter:-spree');
  },
  serializerFor: function() {
    return this.container.lookup('serializer:-spree');
  }
});