import Ember from 'ember';
import StorableMixin from 'ember-cli-spree-core/mixins/storable';

module('StorableMixin');

// Replace this with your real tests.
test('it works', function() {
  var StorableObject = Ember.Object.extend(StorableMixin);
  var subject = StorableObject.create();
  ok(subject);
});
