import Ember from 'ember';
import {
  moduleFor,
  test
} from 'ember-qunit';

moduleFor('serializer:order', {
  // Specify the other units that are required for this test.
  needs: [
    'store:spree',
    'serializer:spree',
    'model:order',
    'model:user',
    'model:lineItem',
    'model:variant',
    'model:shipment',
    'model:shippingMethod',
    'model:shippingCategory',
    'model:shippingRate',
    'model:zone',
    'model:stockLocation',
    'model:payment',
    'model:paymentMethod',
    'model:source',
    'model:address', 
    'model:state', 
    'model:country',
    'transform:raw'
  ]
});

// Replace this with your real tests.
test('it exists', function(assert) {
  var serializer = this.subject();
  assert.ok(serializer);
});

test('it serializes correctly on the address state', function(assert) {
  var serializer = this.subject();
  assert.ok(serializer);
  
  var spreeStore = this.container.lookup('store:spree');
  Ember.run(function() {
    var order = spreeStore.createRecord('order', {
      state: 'address'
    });

    var USA = spreeStore.createRecord('country', {
      name: 'United States'
    });

    var NY = spreeStore.createRecord('state', {
      name: 'New York'
    });

    var shipAddress = spreeStore.createRecord('address', {
      firstname: 'Hugh',
      lastname: 'Francis',
      address1: '123 Street st',
      address2: 'Suite 2',
      city: 'New York City',
      zipcode: '10002',
      phone: '1231231234',
      country: USA, 
      state: NY
    });
    
    order.set('shipAddress', shipAddress);
    order.set('billAddress', shipAddress);
    assert.ok(order);
 
    var payload = order.serialize();

    assert.ok(payload.order.ship_address_attributes);
    assert.ok(payload.order.bill_address_attributes);
    assert.equal(payload.order.ship_address_attributes.city, 'New York City');
  });
});

test('it serializes correctly based on order state', function(assert) {
  var serializer = this.subject();
  assert.ok(serializer);
  
  var spreeStore = this.container.lookup('store:spree');
  Ember.run(function() {
    var order = spreeStore.createRecord('order', {
      state: 'address'
    });

    var USA = spreeStore.createRecord('country', {
      name: 'United States'
    });

    var NY = spreeStore.createRecord('state', {
      name: 'New York'
    });

    var shipAddress = spreeStore.createRecord('address', {
      firstname: 'Hugh',
      lastname: 'Francis',
      address1: '123 Street st',
      address2: 'Suite 2',
      city: 'New York City',
      zipcode: '10002',
      phone: '1231231234',
      country: USA, 
      state: NY
    });
    
    order.set('shipAddress', shipAddress);
    order.set('billAddress', shipAddress);
    assert.ok(order);
    
    var payload = order.serialize();

    assert.ok(payload.order.ship_address_attributes);
    assert.ok(payload.order.bill_address_attributes);
    assert.equal(payload.order.ship_address_attributes.city, 'New York City');

    order.set('state', 'delivery');

    payload = order.serialize();

    assert.ok(payload.order.shipments_attributes);

    assert.throws(payload.order.ship_address_attributes);
    assert.throws(payload.order.bill_address_attributes);

    order.set('state', 'payment');
    
    var paymentMethod = spreeStore.createRecord('paymentMethod', {
      id: 1
    });
    var payment = spreeStore.createRecord('payment');
    var source  = spreeStore.createRecord('source');
    payment.set('paymentMethod', paymentMethod);
    payment.set('source', source);

    source.setProperties({
      month: 1,
      year: 2019,
      number: "4111111111111111",
      name: "Hugh Francis",
      verificationValue: 123
    });

    order.get('payments').pushObject(payment);

    payload = order.serialize();

    assert.ok(payload.payment_source);
    assert.ok(payload.order.payments_attributes);
    assert.equal(payload.order.payments_attributes[0].payment_method_id, "1");
    assert.equal(payload.payment_source[1].number, 4111111111111111);
    
    assert.throws(payload.order.ship_address_attributes);
    assert.throws(payload.order.bill_address_attributes);
    assert.throws(payload.order.shipments_attributes);
  });
});
