import Ember from 'ember';
import { test } from 'ember-qunit';
import startApp from '../helpers/start-app';
import Pretender from 'pretender';

var App,
    Server;

module('Sanity Check', {
  setup: function() {
    App = startApp();
    Server = new Pretender(function() {
      this.get('/api/ams/products', function(request) {
        return [200, { 'Content-Type': 'application/json' }, '{ "products": "access_token" }'];
      });
    });
  },
  teardown: function() {
    Ember.run(App, App.destroy);
  }
});

test('Sanity Check', function() {
  visit('/');
  andThen(function() {
    ok(exists('*'), 'Found some HTML');
  });
});