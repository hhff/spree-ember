import Ember from 'ember';
import {
  module,
  test
} from 'qunit';
import startApp from '../helpers/start-app';

var application;

module('Acceptance: Account', {
  beforeEach: function() {
    window.localStorage.clear();
    application = startApp();
  },

  afterEach: function() {
    Ember.run(application, 'destroy');
  }
});

test('can change password correctly', function(assert) {
  var seed = (new Date()).valueOf().toString();
  var email = 'spree-ember-'+seed+'@example.com';
  var newSeed  = (new Date()).valueOf().toString();
  var newEmail = 'spree-ember-'+seed+'@example.com';

  visit('/account');

  andThen(function() {
    assert.equal(currentPath(), 'spree.signin');
    click('a');
  });

  andThen(function() {
    assert.equal(currentPath(), 'spree.signup');
    fillIn('input[placeholder="Email"]', email);
    fillIn('input[placeholder="Password"]', 'password123');
    fillIn('input[placeholder="Password Confirmation"]', 'password123');
    click('button[type="submit"]');
  });

  andThen(function() {
    assert.equal(currentPath(), 'spree.account');
    assert.equal(find('input[placeholder="Email"]').val(), email);
    fillIn('input[placeholder="Email"]', newEmail);
    click('button[type="submit"]');
  });

  andThen(function() {
    assert.equal(find('input[placeholder="Email"]').val(), newEmail);
  });
});
