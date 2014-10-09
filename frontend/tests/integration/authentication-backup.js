import Ember from 'ember';
import { test } from 'ember-qunit';
import startApp from '../helpers/start-app';
import Pretender from 'pretender';

var App;
var server;

module('Authentication', {
  setup: function() {
    App = startApp();
    server = new Pretender(function() {
      this.post('/token', function(request) {
        return [200, { 'Content-Type': 'application/json' }, '{ "products": {} }'];
      });
    });
  },
  teardown: function() {
    Ember.run(App, App.destroy);
    server.shutdown();
  },
});

test('Users Can Log In', function() {
  expect(2);

  visit('/users/login');

  andThen(function() {
    equal(find('button:contains("Login")').length, 1, 'The page shows a login link when the session is not authenticated');
  });

  // visit('/login');
  // fillIn('#identification', 'letme');
  // fillIn('#password', 'in');
  // click('button[type="submit"]');

  // andThen(function() {
  //   equal(find('a:contains("Logout")').length, 1, 'The page shows a logout link when the session is authenticated');
  // });
});

// test('A protected route is accessible when the session is authenticated', function() {
//   expect(1);
//   authenticateSession();
//   visit('/protected');

//   andThen(function() {
//     equal(currentRouteName(), 'protected');
//   });
// });

// test('A protected route is not accessible when the session is not authenticated', function() {
//   expect(1);
//   invalidateSession();
//   visit('/users/show');

//   andThen(function() {
//     notEqual(currentRouteName(), 'protected');
//   });
// });