import {
  moduleForModel,
  test
} from 'ember-qunit';

moduleForModel('shipping-rate', 'ShippingRate', {
  // Specify the other units that are required for this test.
  needs: [
    'model:shippingMethod',
    'model:shippingCategory',
    'model:zone'
  ]
});

test('it exists', function(assert) {
  var model = this.subject();
  // var store = this.store();
  assert.ok(!!model);
});
