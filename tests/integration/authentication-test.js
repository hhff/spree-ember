import Ember from 'ember';
import { test } from 'ember-qunit';
import startApp from '../helpers/start-app';
import Pretender from 'pretender';

var App,
    Server;

module('Authentication', {
  setup: function() {
    App = startApp();

    var Token = {
      user_id: 1,
      user_email: 'spree-test@example.com',
      user_token: 'test-token'
    };

    var User = {
      id: 14,
      email: 'spree-test@example.com',
      remember_token: null,
      persistence_token: null,
      reset_password_token: null,
      perishable_token: null,
      sign_in_count: 0,
      failed_attempts: 0,
      last_request_at: null,
      current_sign_in_at: null,
      login: 'spree-test@example.com',
      authentication_token: null,
      unlock_token: null,
      locked_at: null,
      reset_password_sent_at: null,
      created_at: '2014-10-16T23:55:10.570Z',
      updated_at: '2014-10-16T23:55:10.570Z',
      spree_api_key: null,
      remember_created_at: null
    };

    Server = new Pretender(function() {
      this.post('/api/ams/users/token', function(request) {
        return [200, { 'Content-Type': 'application/json' }, JSON.stringify(Token)];
      });

      this.post('/api/ams/users', function(request) {
        return [200, { 'Content-Type': 'application/json' }, JSON.stringify({user: User})];
      });
    });

  },
  teardown: function() {
    Ember.run(App, App.destroy);
    Server.shutdown();
  },
});

test('Users Can Log In', function() {
  expect(1);

  visit('/users/login');

  fillIn('input.test-email', 'spree-test@example.com');
  fillIn('input.test-password', 'spree567');
  click('button[type="submit"]');

  andThen(function() {
    equal(find('a:contains("Logout")').length, 1, 'The page shows a logout link when the session is authenticated');
  });
});

test('Users Can Sign Up', function() {
  expect(1);

  visit('/users/new');

  fillIn('input.test-email', 'spree-test@example.com');
  fillIn('input.test-password', 'spree567');
  fillIn('input.test-password-confirmation', 'spree567');
  click('button[type="submit"]');

  andThen(function() {
    equal(find('a:contains("Logout")').length, 1, 'The page shows');
  });
});