import {
  moduleForModel,
  test
} from 'ember-qunit';

moduleForModel('shipment', 'Shipment', {
  // Specify the other units that are required for this test.
  needs: [
    'model:order',
    'model:user',
    'model:address',
    'model:lineItem',
    'model:shipment',
    'model:shippingMethod',
    'model:paymentMethod',
    'model:payment',
    'model:stockLocation',
    'model:shippingRate',
    'model:variant',
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
