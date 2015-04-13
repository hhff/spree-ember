import Ember from 'ember';
import UserRouteActionsMixin from 'spree-ember-auth/mixins/user-route-actions';
import { module, test } from 'qunit';

module('UserRouteActionsMixin');

// Replace this with your real tests.
test('it works', function(assert) {
  var UserRouteActionsObject = Ember.Object.extend(UserRouteActionsMixin);
  var subject = UserRouteActionsObject.create();
  assert.ok(subject);
});
