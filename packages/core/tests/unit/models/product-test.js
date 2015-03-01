import {
  moduleForModel,
  test
} from 'ember-qunit';

moduleForModel('product', 'Product', {
  // Specify the other units that are required for this test.
  needs: [
    'model:image',
    'model:variant',
    'model:productProperty'
  ]
});

test('it exists', function(assert) {
  var model = this.subject();
  // var store = this.store();
  assert.ok(!!model);
});
