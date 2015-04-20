import Ember from 'ember';

export default Ember.Route.extend({
  setupController: function(controller) {
    controller.set('currentCheckoutState', this.spree.current);
  },

  activate: function() {
    this._super.apply(this, arguments);
    this.spree.on('checkoutStateDidChange', this, function(state) {
      this.transitionTo("checkout."+state);
      this.set('controller.currentCheckoutState', state);
    });
  },

  deactivate: function() {
    this.spree.off('checkoutStateDidChange');
  },

  actions: {
    transitionCheckoutState: function(state) {
      this.spree.transitionCheckoutState(state);
      return false;
    }
  }
});
