import Ember from 'ember';
import HandlesNestedServerErrorsMixin from 'spree-ember-core/mixins/handles-nested-server-errors';
import { module, test } from 'qunit';

module('HandlesNestedServerErrorsMixin');

// Replace this with your real tests.
test('it works', function(assert) {
  var HandlesNestedServerErrorsObject = Ember.Object.extend(HandlesNestedServerErrorsMixin);
  var subject = HandlesNestedServerErrorsObject.create();
  assert.ok(subject);
});
