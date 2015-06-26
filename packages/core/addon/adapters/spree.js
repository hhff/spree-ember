import Ember from 'ember';
import DS from 'ember-data';
/**
  The Spree Adapter is responsible for communicating with your Spree store.  It
  assumes your server has the `spree_ams` gem installed.

  @class Spree
  @namespace Adapter
  @extends DS.ActiveModelAdapter
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
    A refernce to the Spree Service.

    @property spree
    @type Subclass of Ember.Service
    @readOnly
  */
  spree: Ember.inject.service("spree"),
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
    var guestToken = this.get('spree.guestToken');
    var orderId    = this.get('spree.orderId');

    if (guestToken && orderId) {
      return {
        "X-Spree-Order-Token": guestToken,
        "X-Spree-Order-Id":    orderId
      };
    } else {
      return { };
    }
  }),

  /**
    Overrides the default buildURL call to check for the `_useCheckoutsEndpoint`
    on the snapshot, (applied to `order` models in the `CanCheckout` mixin). If
    so, the resulting URL will be `{hostname}/{namespace}/checkouts/{record_id}`.
    If the flag isn't present, `_super` is called and the record URL is built
    normally.

    @method buildURL
  */
  buildURL: function(record, suffix, snapshot, requestType) {
    if (record === "order" && snapshot.attr('_useCheckoutsEndpoint')) {
      record = "checkout";
    }
    return this._super.apply(this, [record, suffix, snapshot, requestType]);
  },
});
