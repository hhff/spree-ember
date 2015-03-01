import {
  moduleForModel,
  test
} from 'ember-qunit';

moduleForModel('shipping-method', 'ShippingMethod', {
  // Specify the other units that are required for this test.
  needs: [
    'model:zone',
    'model:shippingCategory',
    'model:shippingRate'
  ]
});

test('it exists', function(assert) {
  var model = this.subject();
  // var store = this.store();
  assert.ok(!!model);
});
