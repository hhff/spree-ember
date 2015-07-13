import CurrentOrderSupport from 'spree-ember-checkouts/mixins/current-order-support';

export function initialize(registry, application) {
  var container = application.__container__; // TODO: deprecated

  var SpreeService = container.lookup('service:spree');
  CurrentOrderSupport.apply(SpreeService);

  application.deferReadiness();
  SpreeService._restoreCurrentOrder().finally(function() {
    //TODO:https://github.com/emberjs/ember.js/issues/11247
    application.advanceReadiness();
  });
}

export default {
  name: 'spree-ember-checkouts',
  after: "spree-ember-core",
  initialize: initialize
};
