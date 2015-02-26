import Ember from 'ember';
import { test } from 'ember-qunit';
import startApp from '../helpers/start-app';

var App,
    Server;

module('Sanity Check', {
  setup: function() {
    App = startApp();

    Server = new Pretender(function() {
      this.get('/api/ams/products', function(request) {
        return [200, { 'Content-Type': 'application/json' }, JSON.stringify({products: {}})];
      });
    });


  },
  teardown: function() {
    Ember.run(App, App.destroy);
    Server.shutdown();
  }
});

test('Sanity Check', function() {
  visit('/');
  andThen(function() {
    ok(exists('*'), 'Found some HTML');
  });
});