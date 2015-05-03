import Ember from 'ember';
import layout from '../templates/components/spree-checkout';

export default Ember.Component.extend({
  layout: layout,
  action: 'transitionCheckoutState',

  actions: {
    transitionCheckoutState: function(stateName) {
      this.sendAction('action', stateName);
    }
  }
});
