import SpreeSerializer from 'spree-ember-core/serializers/spree';
import SpreeAdapter from 'spree-ember-core/adapters/spree';

export function initialize(container, application) {
  /* Register Spree Utilities with the Container */
  container.register('serializer:-spree', SpreeSerializer);
  container.register('adapter:-spree', SpreeAdapter);

  /* Inject the Spree Store into the Spree Service */
  application.inject('service:spree', 'store', 'store:spree');

  /* Inject the Spree Service into Routes & Components */
  application.inject('route', 'spree', 'service:spree');
  application.inject('controller', 'spree', 'service:spree');
  application.inject('component', 'spree', 'service:spree');

  /* Copy Environment and Spree Configuration to Spree Service */
  var SpreeService = container.lookup('service:spree');
  SpreeService.set('environment', ENV.environment);
  SpreeService.set('config', ENV['spree'] || {});
}

export default {
  name: 'spree-ember-core',
  initialize: initialize
};
