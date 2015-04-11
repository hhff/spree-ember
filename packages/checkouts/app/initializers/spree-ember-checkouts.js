import Checkouts from 'spree-ember-checkouts/mixins/checkouts';

export function initialize(container, application) {
  var SpreeService = container.lookup('service:spree');
  Checkouts.apply(SpreeService);
  SpreeService.initCheckouts(application);
}

export default {
  name: 'spree-ember-checkouts',
  after: "spree-ember-core",
  initialize: initialize
};
