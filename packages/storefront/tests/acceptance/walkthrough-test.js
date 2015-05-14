import Ember from 'ember';
import { 
  module, 
  test 
} from 'qunit';
import startApp from '../helpers/start-app';

var application;

module('Acceptance: Walkthrough', {
  beforeEach: function() {
    application = startApp();
  },

  afterEach: function() {
    Ember.run(application, 'destroy');
    window.localStorage.clear();
  }
});

var createRandomEmail = function() {
  var seed = (new Date()).valueOf().toString();
  return 'spree-ember-'+seed+'@example.com';
};

test('checkout walkthough', function(assert) {
  visit('/products/ruby-on-rails-baseball-jersey');
  
  andThen(function() {
    assert.equal(currentPath(), 'spree.products.show');
    click('button');  
  });

  andThen(function() {
    assert.equal(currentPath(), 'spree.cart');
    click('button');
  });

  andThen(function() {
    assert.equal(currentPath(), 'spree.checkout');
    assert.equal(find('legend:last').text(), 'address');
    
    // Fill in Shipping Address
    fillIn('input[Placeholder="Email"]', createRandomEmail());
    fillIn('input[Placeholder="First Name"]', "Hugh");
    fillIn('input[Placeholder="Last Name"]', "Francis"); 
    fillIn('input[Placeholder="Address"]', "123 Street St");
    fillIn('input[Placeholder="City"]', "Brooklyn");
    fillIn('input[Placeholder="Zipcode"]', 11211); 
    fillIn('input[Placeholder="Phone"]', 1231231234);

    // Select USA
    var USA = find('option:contains(United States):first').val();
    fillIn('select:first', USA); 
  });

  andThen(function() {
    // Select NY
    var NY = find('option:contains(New York):first').val();
    fillIn('select:last', NY);
    click('button');
  });

  andThen(function() {
    assert.equal(find('legend:last').text(), 'delivery');
    click('button');
  });

  andThen(function() {
    assert.equal(find('legend:last').text(), 'payment');
    
    fillIn('input[Placeholder="Card Number"]', 4111111111111111);
    fillIn('input[Placeholder="Name"]', 'Hugh Francis');
    fillIn('input[Placeholder="MM"]', 02);
    fillIn('input[Placeholder="YYYY"]', 2019);
    fillIn('input[Placeholder="Verification Value"]', 123);
    click('button');
  });

  andThen(function() {
    assert.equal(find('legend:first').text(), 'confirm');
    click('button');
  });

  andThen(function() {
    assert.equal(currentPath(), "spree.orders.show");
  });
});
