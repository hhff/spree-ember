import Ember from 'ember';
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
  @uses SpreeEmber.Adapter, SpreeEmber.Serializer, Ember.Evented
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
  },

  /**
    Find a model by it's `slug` attribute.

    @method findBySlug
    @param String type A model type
    @param String slug The model's slug
    @return {SpreeEmber.Adapter} The Spree Ember Adapater.
  */
  findBySlug: function(type, slug) {
    Ember.assert("You need to pass a type to the store's findBySlug method", arguments.length >= 1);
    Ember.assert("You need to pass a slug to the store's findBySlug method", arguments.length >= 2);

    var store      = this;
    type           = this.modelFor(type);
    var adapter    = this.adapterFor(type);
    var serializer = this.serializerFor(type);

    var promise = adapter.find(store, type, slug, null);

    return promise.then(
      function(adapterPayload) {
        var payload = serializer.extract(store, type, adapterPayload, slug, 'find');
        return store.push(type, payload);
      },
      function(error) {
        throw Error(error);
      }
    );
  }
});