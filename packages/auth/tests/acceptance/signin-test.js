import Ember from 'ember';
import {
  module,
  test
} from 'qunit';
import startApp from '../helpers/start-app';

var application;

module('Acceptance: Signin', {
  beforeEach: function() {
    window.localStorage.clear();
    application = startApp();
  },

  afterEach: function() {
    Ember.run(application, 'destroy');
  }
});

test('cant get to account unless authenticated', function(assert) {
  visit('spree/account');

  andThen(function() {
    assert.equal(currentPath(), 'spree.signin');
    fillIn('input[placeholder="Email"]', 'spree-ember@example.com');
    fillIn('input[placeholder="Password"]', 'spree123');
    click('button[type="submit"]');
  });

  andThen(function() {
    assert.equal(currentPath(), 'spree.account');
  });
});


test('once authenticated, cant get to auth routes', function(assert) {
  visit('spree/signin');

  andThen(function() {
    assert.equal(currentPath(), 'spree.signin');
    fillIn('input[placeholder="Email"]', 'spree-ember@example.com');
    fillIn('input[placeholder="Password"]', 'spree123');
    click('button[type="submit"]');
  });

  andThen(function() {
    assert.equal(currentPath(), 'spree.account');
  });

  andThen(function() {
    visit('spree/signin');
  });

  andThen(function() {
    assert.equal(currentPath(), 'spree.account');
  });
  
  andThen(function() {
    visit('spree/signup');
  });

  andThen(function() {
    assert.equal(currentPath(), 'spree.account');
  });
});
