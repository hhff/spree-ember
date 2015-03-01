import {
  moduleForModel,
  test
} from 'ember-qunit';

moduleForModel('country', 'Country', {
  // Specify the other units that are required for this test.
  needs: [
    'model:state'
  ]
});

test('it exists', function(assert) {
  var model = this.subject();
  // var store = this.store();
  assert.ok(!!model);
});
