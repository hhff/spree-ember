import Checkouts from 'ember-cli-spree-checkouts/mixins/checkouts';

export function initialize(container, application) {
  var SpreeService = container.lookup('service:spree');
  Checkouts.apply(SpreeService);
  SpreeService.restore();
}

export default {
  name: 'ember-cli-spree-checkouts',
  after: "ember-cli-spree-core",
  initialize: initialize
};
