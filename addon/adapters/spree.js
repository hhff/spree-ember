import Ember from 'ember';
import DS from 'ember-data';
import SpreeSerializer from 'ember-cli-spree-core/serializers/spree';

export default DS.ActiveModelAdapter.extend({
  defaultSerializer: '-spree',
  serializer: SpreeSerializer.create(),

  namespace: Ember.computed('spree.config.apiNamespace', function() {
    var namespace = this.get('spree.config.namespace');
    return namespace || 'api/ams';
  }),

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