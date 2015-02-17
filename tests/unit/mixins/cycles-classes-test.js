import Ember from 'ember';
import CyclesClassesMixin from 'ember-cli-spree-frontend/mixins/cycles-classes';

module('CyclesClassesMixin');

// Replace this with your real tests.
test('it works', function() {
  var CyclesClassesObject = Ember.Object.extend(CyclesClassesMixin);
  var subject = CyclesClassesObject.create();
  ok(subject);
});
