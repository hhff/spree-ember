import {
  moduleFor,
  test
} from 'ember-qunit';

moduleFor('transform:raw', 'RawTransform');

// Replace this with your real tests.
test('it exists', function(assert) {
  var transform = this.subject();
  assert.ok(transform);
});

test('it does not effect the payload', function(assert) {
  var transform = this.subject();
  assert.ok(transform);
  
  var payload = ["Drake", "Big Sean", "Lil Wayne"];
  
  var serialized = transform.serialize(payload);
  assert.equal(serialized, payload);

  var deserialized = transform.deserialize(payload);
  assert.equal(deserialized, payload);
});
