import Ember from 'ember';
import {
  module,
  test
} from 'qunit';
import startApp from '../helpers/start-app';

var application, container, spree;

module('Acceptance: Checkouts', {
  beforeEach: function() {
    window.localStorage.clear();
    application = startApp();
    container   = application.__container__;
    spree       = container.lookup('service:spree');
  },

  afterEach: function() {
    Ember.run(application, 'destroy');
  }
});

var randomItemFromArray = function(items) {
  return items.objectAt(Math.floor(Math.random()*items.get('length')));
};

var randomNumberInRange = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var assembleRandomCart = function(assert) {
  return Ember.run(function() {
    return spree.store.find('product').then(function(products){
      assert.ok(products);
      var product = randomItemFromArray(products);
      var variant = randomItemFromArray(product.get('variantsIncludingMaster'));
      var quantity = randomNumberInRange(1, 10);
      return spree.addToCart(variant, quantity).then(function(lineItem) {
        assert.ok(lineItem.get('quantity'), quantity);
        return lineItem;
      });
    });
  });
};


test('can add to cart', function(assert) {
  assert.equal(spree.get('currentOrder'), undefined);
 
  return assembleRandomCart(assert).then(function(lineItem){
    assert.ok(lineItem);

    var currentOrder = spree.get('currentOrder');
    assert.ok(currentOrder);
  });
});

test('can clear a current order', function(assert) {
  assert.equal(spree.get('currentOrder'), undefined);
  
  return assembleRandomCart(assert).then(function(lineItem){
    assert.ok(lineItem);
    assert.ok(spree.get('currentOrder'));
    spree.clearCurrentOrder();
    assert.equal(spree.get('currentOrder'), undefined);
  });
});

test('persists order info to local storage', function(assert) {
  assert.equal(spree.get('currentOrder'), undefined);
 
  return assembleRandomCart(assert).then(function(lineItem){
    assert.ok(lineItem);

    var currentOrder     = spree.get('currentOrder');
    var orderId          = currentOrder.get('id');
    var orderToken       = currentOrder.get('token');
    var localStorageData = JSON.parse(window.localStorage.getItem('spree-ember'));

    assert.ok(localStorageData.orderId, orderId);
    assert.ok(localStorageData.guestToken, orderToken);
  });
});

test('can advance order state', function(assert) {
  return Ember.run(function() {
    assert.equal(spree.get('currentOrder'), undefined);
    var checkouts = spree.get('checkouts');

    return assembleRandomCart(assert).then(function(lineItem){
      assert.ok(lineItem);
      var currentOrder = spree.get('currentOrder');

      assert.ok(currentOrder);
      assert.equal(currentOrder.get('state'), 'cart');
      assert.equal(checkouts.get('currentState'), 'cart');

      return checkouts.transition().then(function(/*order*/){
        assert.equal(currentOrder.get('state'), 'address');
        assert.equal(checkouts.get('currentState'), 'address');
        assert.ok(currentOrder.get('shipAddress'));
        
        return checkouts.transition().catch(function() {
          assert.equal(currentOrder.get('errors.base.firstObject.message'), "Invalid resource. Please fix errors and try again.");
          assert.ok(currentOrder.get('shipAddress.errors.length'));

          return spree.get('countries').then(function(countries) {
            assert.ok(countries);
          
            var USA = countries.findBy('name', 'United States');
            var NY  = USA.get('states').findBy('name', 'New York');

            spree.get('currentOrder.shipAddress').setProperties({
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
            
            var seed = (new Date()).valueOf().toString();
            currentOrder.set('email', 'spree-ember-'+seed+'@example.com');
            
            return checkouts.transition().then(function() {
              assert.equal(currentOrder.get('state'), 'delivery');
              
              return checkouts.transition().then(function() {
                assert.equal(currentOrder.get('state'), 'payment');
                assert.equal(checkouts.get('currentState'), 'payment');
                assert.ok(currentOrder.get('activePayment'));
                
                return checkouts.transition().catch(function() {
                  assert.equal(currentOrder.get('state'), 'payment');
                  assert.equal(checkouts.get('currentState'), 'payment');
                  assert.equal(currentOrder.get('errors.base.firstObject.message'), "Invalid resource. Please fix errors and try again.");
                  // Data Entry
                  currentOrder.get('activePayment.source').setProperties({
                    month: 1,
                    year: 2019,
                    number: "4111111111111111",
                    name: "Hugh Francis",
                    verificationValue: 123
                  });
                  
                  // TODO - Need to get this to complete.

                  //return checkouts.transition().then(function() {
                  //  assert.equal(currentOrder.get('state'), 'confirm');
                  //  assert.equal(checkouts.get('currentState'), 'confirm');

                  //  return checkouts.transition().catch(function() {
                  //    assert.equal(currentOrder.get('state'), 'complete');
                  //  });
                  //});
                });
              });
            });
          });
        });  
      });
    });
  });
});    
