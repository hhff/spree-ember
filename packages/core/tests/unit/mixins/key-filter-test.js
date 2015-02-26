import Ember from 'ember';
import KeyFilterMixin from 'ember-cli-spree-core/mixins/key-filter';

module('KeyFilterMixin');

// Replace this with your real tests.
test('it works', function() {
  var KeyFilterObject = Ember.Object.extend(KeyFilterMixin);
  var subject = KeyFilterObject.create();
  ok(subject);
});
