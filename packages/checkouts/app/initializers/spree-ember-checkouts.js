import Checkouts from 'spree-ember-checkouts/mixins/checkouts';
import { 
  orderStateEvents, 
  orderStateCallbacks,
  resolvePendingTransition
} from '../checkouts/spree';

export function initialize(container, application) {
  var SpreeService = container.lookup('service:spree');
  Checkouts.apply(SpreeService);
  SpreeService._initCheckouts(application, {
    orderStateEvents:         orderStateEvents,
    orderStateCallbacks:      orderStateCallbacks,
    resolvePendingTransition: resolvePendingTransition
  });
}

export default {
  name: 'spree-ember-checkouts',
  after: "spree-ember-core",
  initialize: initialize
};
