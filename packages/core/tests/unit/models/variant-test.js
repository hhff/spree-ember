import {
  moduleForModel,
  test
} from 'ember-qunit';

moduleForModel('variant', 'Variant', {
  // Specify the other units that are required for this test.
  needs: [
    'model:product',
    'model:image',
    'model:productProperty'
  ]
});

test('it exists', function(assert) {
  var model = this.subject();
  // var store = this.store();
  assert.ok(!!model);
});
