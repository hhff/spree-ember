import Ember from 'ember';
import StorableMixin from 'ember-cli-spree-core/mixins/storable';
import { module, test } from 'qunit';

module('StorableMixin');

// Replace this with your real tests.
test('it works', function(assert) {
  var StorableObject = Ember.Object.extend(StorableMixin);
  var subject = StorableObject.create();
  assert.ok(subject);
});
