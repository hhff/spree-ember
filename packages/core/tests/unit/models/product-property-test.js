import {
  moduleForModel,
  test
} from 'ember-qunit';

moduleForModel('product-property', 'ProductProperty', {
  // Specify the other units that are required for this test.
  needs: [
    'model:product',
    'model:image',
    'model:variant'
  ]
});

test('it exists', function(assert) {
  var model = this.subject();
  // var store = this.store();
  assert.ok(!!model);
});
