import Ember from 'ember';
import DS from 'ember-data';
import SpreeSerializer from 'ember-cli-spree-core/serializers/spree';

/**
  The Spree Adapter is responsible for communicating with your Spree store.  It
  assumes your server has the `spree_ams` gem installed.

  @class Adapter
  @namespace SpreeEmber
  @module ember-cli-spree-core/adapters/spree
  @extends DS.ActiveModelAdapter
  @uses SpreeEmber.Serializer
*/

export default DS.ActiveModelAdapter.extend({
  /**
    The container lookup name for the default Spree serializer.

    @property defaultSerializer
    @type String
    @readOnly
    @default '-spree'
  */
  defaultSerializer: '-spree',

  /**
    A reference to the Spree serializer.

    @property serializer
    @type SpreeEmber.Serializer
    @readOnly
    @default SpreeEmber.Serializer
  */
  serializer: SpreeSerializer.create(),

  /**
    A computed property for the server namespace.  If it's not set in the Host
    Application's spree configuration by `spree.apiNamespace`, it will default to
    `api/ams`, to work out of the box with the `spree_ams` Gem.

    @property namespace
    @type String
    @readOnly
    @default 'api/ams'
  */
  namespace: Ember.computed('spree.config.apiNamespace', function() {
    var namespace = this.get('spree.config.namespace');
    return namespace || 'api/ams';
  }),


  /**
    A computed property for the server host.  If it's not set in the Host Application's
    spree configuration by `spree.apiHost`, it will default to 'http://localhost:3000'
    in all environments aside from test, where it will default to `null` (to satisfy
    Pretender).

    @property host
    @type String
    @readOnly
    @default 'http://localhost:3000'
  */
  host: Ember.computed('spree.config.apiHost', function() {
    var host = this.get('spree.config.apiHost');
    if (host) {
      return host;
    } else {
      var environment = this.get('spree.environment');
      if (environment === "test") {
        host = null;
      } else {
        host = 'http://localhost:3000';
      }
      return host;
    }
  }),

  /**
    A computed property for the adapter headers.  We use these headers to authenticate
    the user against the order we're trying to modify.  The `spree_ams` gem will
    look for these, and do the work here.

    @property headers
    @type String
    @readOnly
    @default {}
  */
  headers: Ember.computed('spree.guestToken', 'spree.orderId', function() {
    var guestToken = this.spree.get('guestToken');
    var orderId    = this.spree.get('orderId');

    if (guestToken && orderId) {
      return {
        "X-Spree-Order-Token": guestToken,
        "X-Spree-Order-Id":    orderId
      };
    } else {
      return {};
    }
  })
});