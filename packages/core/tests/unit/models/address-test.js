import {
  moduleForModel,
  test
} from 'ember-qunit';

moduleForModel('address', 'Address', {
  // Specify the other units that are required for this test.
  needs: [
    'model:state',
    'model:country'
  ]
});

test('it exists', function(assert) {
  var model = this.subject();
  // var store = this.store();
  assert.ok(!!model);
});
