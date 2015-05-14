import Ember from 'ember';
import CanCheckoutMixin from 'spree-ember-core/mixins/can-checkout';
import { module, test } from 'qunit';

module('CanCheckoutMixin');

test('it works', function(assert) {
  var CanCheckoutObject = Ember.Object.extend(CanCheckoutMixin);
  var subject = CanCheckoutObject.create();
  assert.ok(subject);
});

test('it has the saveToCheckouts() function', function(assert) {
  var CanCheckoutObject = Ember.Object.extend(CanCheckoutMixin);
  var subject = CanCheckoutObject.create();
  assert.ok(subject);
  assert.ok(subject["saveToCheckouts"]);
});
