import {
  moduleForModel,
  test
} from 'ember-qunit';

moduleForModel('state', 'State', {
  // Specify the other units that are required for this test.
  needs: [
    'model:country'
  ]
});

test('it exists', function(assert) {
  var model = this.subject();
  // var store = this.store();
  assert.ok(!!model);
});
