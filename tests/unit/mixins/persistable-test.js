import Ember from 'ember';
import PersistableMixin from 'ember-cli-spree-core/mixins/persistable';

module('PersistableMixin');

// Replace this with your real tests.
test('it works', function() {
  var PersistableObject = Ember.Object.extend(PersistableMixin);
  var subject = PersistableObject.create();
  ok(subject);
});
