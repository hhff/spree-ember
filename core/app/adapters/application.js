import DS from 'ember-data';
import config from '../config/environment';

var Adapter;

// This is because Pretender cant request full URLS.
if (config.environment === 'test') {
  Adapter = DS.ActiveModelAdapter.extend({
    namespace: 'api/ams'
  });
} else {
  Adapter = DS.ActiveModelAdapter.extend({
    namespace: 'api/ams',
    host: config.spreeConfig.apiHost,

    headers: Ember.computed('spree.guestToken', 'spree.orderId', function() {
      if (this.spree.get('guestToken') && this.spree.get('orderId')) {
        return {
          "X-Spree-Order-Token": this.spree.get('guestToken'),
          "X-Spree-Order-Id": this.spree.get('orderId')
        }
      }
    })
  });
}


export default Adapter;