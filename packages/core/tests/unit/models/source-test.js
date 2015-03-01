import {
  moduleForModel,
  test
} from 'ember-qunit';

moduleForModel('source', 'Source', {
  // Specify the other units that are required for this test.
  needs: [
    'model:paymentMethod'
  ]
});

test('it exists', function(assert) {
  var model = this.subject();
  // var store = this.store();
  assert.ok(!!model);
});
