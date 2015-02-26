import Ember from 'ember';
import CheckoutsMixin from 'ember-cli-spree-core/mixins/checkouts';

module('CheckoutsMixin');

// Replace this with your real tests.
test('it works', function() {
  var CheckoutsObject = Ember.Object.extend(CheckoutsMixin);
  var subject = CheckoutsObject.create();
  ok(subject);
});
