import {
  moduleForModel,
  test
} from 'ember-qunit';

moduleForModel('order', 'Order', {
  // Specify the other units that are required for this test.
  needs: [
    'model:user',
    'model:address',
    'model:lineItem',
    'model:shipment',
    'model:shippingMethod',
    'model:paymentMethod',
    'model:payment',
    'model:state',
    'model:country',
    'model:variant',
    'model:product',
    'model:image',
    'model:productProperty',
    'model:stockLocation',
    'model:shippingRate',
    'model:zone',
    'model:shippingCategory',
    'model:source'
  ]
});

test('it exists', function(assert) {
  var model = this.subject();
  // var store = this.store();
  assert.ok(!!model);
});
