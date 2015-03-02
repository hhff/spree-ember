import Ember from 'ember';

export default Ember.Component.extend({
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
        stepObject.set('className', 'unavailable');
      }

      if (stepName === checkoutState) {
        stepObject.set('className', 'current');
      }

      stepObjects.pushObject(stepObject);
    }
    return stepObjects;
  }),

  actions:  {
    clickedCrumb: function(stepName) {
      this.sendAction('action', stepName);
    }
  }
});
