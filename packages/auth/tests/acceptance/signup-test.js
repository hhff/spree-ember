import Ember from 'ember';
import {
  module,
  test
} from 'qunit';
import startApp from '../helpers/start-app';

var application;

module('Acceptance: Signup', {
  beforeEach: function() {
    window.localStorage.clear();
    application = startApp();
  },

  afterEach: function() {
    Ember.run(application, 'destroy');
  }
});

test('can signup successfully', function(assert) {
  var seed = (new Date()).valueOf().toString();
  var email = 'spree-ember-'+seed+'@example.com';

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
  });
});

test('can not signup with an invalid email', function(assert) {
  var seed = (new Date()).valueOf().toString();

  visit('/account');

  andThen(function() {
    assert.equal(currentPath(), 'spree.signin');
    click('a');
  });

  andThen(function() {
    assert.equal(currentPath(), 'spree.signup');
    fillIn('input[placeholder="Email"]', 'not-an-email');
    fillIn('input[placeholder="Password"]', 'password123');
    fillIn('input[placeholder="Password Confirmation"]', 'password123');
    click('button[type="submit"]');
  });

  andThen(function() {
    assert.equal(currentPath(), 'spree.signup');
  });
});


test('can not signup without a password', function(assert) {
  var seed = (new Date()).valueOf().toString();

  visit('/account');

  andThen(function() {
    assert.equal(currentPath(), 'spree.signin');
    click('a');
  });

  andThen(function() {
    assert.equal(currentPath(), 'spree.signup');
    fillIn('input[placeholder="Email"]', 'spree-ember-'+ seed +'@example.com');
    fillIn('input[placeholder="Password Confirmation"]', 'password123');
    click('button[type="submit"]');
  });

  andThen(function() {
    assert.equal(currentPath(), 'spree.signup');
  });
});


test('can signup without a password confirmation', function(assert) {
  var seed = (new Date()).valueOf().toString();

  visit('/account');

  andThen(function() {
    assert.equal(currentPath(), 'spree.signin');
    click('a');
  });

  andThen(function() {
    assert.equal(currentPath(), 'spree.signup');
    fillIn('input[placeholder="Email"]', 'spree-ember-'+ seed +'@example.com');
    fillIn('input[placeholder="Password"]', 'password123');
    click('button[type="submit"]');
  });

  andThen(function() {
    assert.equal(currentPath(), 'spree.account');
  });
});
