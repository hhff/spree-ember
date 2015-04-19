import ENV from '../config/environment';
import SpreeSerializer from 'spree-ember-core/serializers/spree';
import SpreeAdapter from 'spree-ember-core/adapters/spree';
import SpreeStore from 'spree-ember-core/stores/spree';

export function initialize(container, application) {
  /* Register Spree Utilities with the Container */
  container.register('serializer:-spree', SpreeSerializer);
  container.register('adapter:-spree', SpreeAdapter);
  container.register('store:spree', SpreeStore);

  /* Inject the Spree Store into the Spree Service */
  application.inject('service:spree', 'store', 'store:spree');

  /* Inject the Spree Service into the Spree Adapter */
  application.inject('adapter:-spree', 'spree', 'service:spree');

  /* Inject the Spree Service into Routes & Components */
  application.inject('route', 'spree', 'service:spree');
  application.inject('controller', 'spree', 'service:spree');
  application.inject('component', 'spree', 'service:spree');

  /* Copy Environment and Spree Configuration to Spree Service */
  var SpreeService = container.lookup('service:spree');
  SpreeService.set('environment', ENV.environment);
  SpreeService.set('config', ENV['spreeEmber'] || {});
}

export default {
  name: 'spree-ember-core',
  initialize: initialize
};
