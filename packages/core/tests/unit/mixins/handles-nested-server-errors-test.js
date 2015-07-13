import Ember from 'ember';
import HandlesNestedServerErrorsMixin from 'spree-ember-core/mixins/handles-nested-server-errors';
import {
  moduleForModel,
  test
} from 'ember-qunit';

moduleForModel('order', 'Unit | Mixin | Order', {
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

test('it handles spree errors', function(assert) {
  var order = this.subject();
  HandlesNestedServerErrorsMixin.apply(order);
  assert.ok(!!order);
  assert.ok(Ember.isEmpty(order.get("errors")));

  var store = this.store();
  
  Ember.run(function() {
    var shipAddress = store.createRecord("address");
    var payment = store.createRecord("payment");
    var source = store.createRecord("source");

    payment.set("source", source);
    order.get("payments").pushObject(payment);
    assert.ok(order.get('activePayment'));

    order.set('shipAddress', shipAddress);
    
    order.adapterDidInvalidate({
      "base": ["could not save shipping address"],
      "ship_address.firstname": ["can't be blank"],
      "payments.Credit Card": ["month can't be blank", "Verification Value is invalid"]
    });
    
    assert.equal(order.get('errors.length'), 1);
    assert.equal(order.get('errors.firstObject').attribute, 'base');
    assert.equal(order.get('errors.firstObject').message, 'could not save shipping address');
    
    assert.equal(order.get('shipAddress.errors.length'), 1);
    assert.equal(order.get('shipAddress.errors.firstObject').attribute, 'firstname');
    assert.equal(order.get('shipAddress.errors.firstObject').message, "can't be blank");

    assert.equal(order.get('activePayment.source.errors.length'), 2);
    assert.equal(order.get('activePayment.source.errors.firstObject').attribute, 'month');
    assert.equal(order.get('activePayment.source.errors.firstObject').message, "can't be blank");
    assert.equal(order.get('activePayment.source.errors.lastObject').attribute, 'verificationValue');
    assert.equal(order.get('activePayment.source.errors.lastObject').message, "is invalid");

  });
});
