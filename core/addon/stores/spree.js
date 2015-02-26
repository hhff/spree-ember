import DS from 'ember-data';

/**
  The Spree Store is what connects the Spree Serializer & Adapter.  It's injected
  in the `spree` service, so that we can effectively isolate Spree Ember's data from
  the Host Application's regular Store, Adapter & Serializer.  This is useful
  for Rails Applications that have Spree added, but have regular endpoints that
  don't hit the Spree endpoint.

  @class Store
  @namespace SpreeEmber
  @module ember-cli-spree-core/stores/spree
  @uses SpreeEmber.Adapter, SpreeEmber.Serializer
  @extends DS.Store
*/
export default DS.Store.extend({
  /**
    The container lookup name for the Spree adapter.

    @property adapter
    @type String
    @readOnly
    @default '-spree'
  */
  adapter: '-spree',

  /**
    The container lookup name for the default Spree serializer.

    @property defaultSerializer
    @type String
    @readOnly
    @default '-spree'
  */
  defaultSerializer: '-spree',

  /**
    Always returns the Spree Adapter.

    @method adapterFor
    @return {SpreeEmber.Adapter} The Spree Ember Adapater.
  */
  adapterFor: function() {
    return this.container.lookup('adapter:-spree');
  },

  /**
    Always returns the Spree Serializer.

    @method serializerFor
    @return {SpreeEmber.Serializer} The Spree Ember Serializer.
  */
  serializerFor: function() {
    return this.container.lookup('serializer:-spree');
  }
});