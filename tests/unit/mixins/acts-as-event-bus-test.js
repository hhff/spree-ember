import Ember from 'ember';
import ActsAsEventBusMixin from 'ember-cli-spree-core/mixins/acts-as-event-bus';

module('ActsAsEventBusMixin');

// Replace this with your real tests.
test('it works', function() {
  var ActsAsEventBusObject = Ember.Object.extend(ActsAsEventBusMixin);
  var subject = ActsAsEventBusObject.create();
  ok(subject);
});
