import {
  moduleForModel,
  test
} from 'ember-qunit';

moduleForModel('line-item', 'LineItem', {
  // Specify the other units that are required for this test.
  needs: [
    'model:order',
    'model:variant',
    'model:user',
    'model:state',
    'model:address',
    'model:shipment',
    'model:shippingMethod',
    'model:paymentMethod',
    'model:payment',
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
