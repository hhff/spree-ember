import CurrentOrderSupport from 'spree-ember-checkouts/mixins/current-order-support';

export function initialize(container, application) {
  var SpreeService = container.lookup('service:spree');
  CurrentOrderSupport.apply(SpreeService);

  application.deferReadiness();
  SpreeService._restoreCurrentOrder().finally(function() {
    application.advanceReadiness();
  });
}

export default {
  name: 'spree-ember-checkouts',
  after: "spree-ember-core",
  initialize: initialize
};
