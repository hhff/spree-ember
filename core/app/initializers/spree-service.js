export function initialize(container, application) {
  application.inject('route', 'spree', 'service:spree');
  application.inject('controller', 'spree', 'service:spree');
  application.inject('adapter:application', 'spree', 'service:spree');

  application.inject('service:spree', 'store', 'store:main')
}

export default {
  name: 'spree-service',
  initialize: initialize
};