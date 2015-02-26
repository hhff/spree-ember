import Ember from 'ember';
import CheckoutsMixin from '../../../mixins/checkouts';
import { module, test } from 'qunit';

module('CheckoutsMixin');

// Replace this with your real tests.
test('it works', function(assert) {
  var CheckoutsObject = Ember.Object.extend(CheckoutsMixin);
  var subject = CheckoutsObject.create();
  assert.ok(subject);
});
