import Ember from 'ember';
import layout from '../templates/components/spree-breadcrumbs';

export default Ember.Component.extend({
  layout: layout,
  action: 'transitionCheckoutState',

  steps: Ember.computed('checkoutSteps', 'checkoutState', function() {
    var checkoutSteps = this.get('checkoutSteps') || Ember.A();
    var checkoutState = this.get('checkoutState');
    var stepObjects   = Ember.A();

    for (var i = 0; i < checkoutSteps.length; i++) {
      var stepName          = checkoutSteps[i];
      var stepObject        = Ember.Object.create({ name: stepName, link: "checkout."+stepName });
      var currentStateIndex = checkoutSteps.indexOf(checkoutState);
      var stepIndex         = checkoutSteps.indexOf(stepName);

      if (stepIndex > currentStateIndex) {
        stepObject.set('status', 'unavailable');
      } else if (stepName === checkoutState) {
        stepObject.set('status', 'current');
      } else {
        stepObject.set('status', 'completed');
      }

      stepObjects.pushObject(stepObject);
    }
    return stepObjects;
  }),

  actions:  {
    clickedCrumb: function(step) {
      if (step.get('status') === "completed") {
        this.sendAction('action', step.get('name'));
      }
    }
  }
});
