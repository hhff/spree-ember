import Ember from 'ember';
import CanCheckoutMixin from 'spree-ember-core/mixins/can-checkout';
import { module, test } from 'qunit';

module('CanCheckoutMixin');

// Replace this with your real tests.
test('it works', function(assert) {
  var CanCheckoutObject = Ember.Object.extend(CanCheckoutMixin);
  var subject = CanCheckoutObject.create();
  assert.ok(subject);
});
