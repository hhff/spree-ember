import Ember from 'ember';
import RouteSetupMixin from 'ember-cli-spree-frontend/mixins/route-setup';

module('RouteSetupMixin');

// Replace this with your real tests.
test('it works', function() {
  var RouteSetupObject = Ember.Object.extend(RouteSetupMixin);
  var subject = RouteSetupObject.create();
  ok(subject);
});
