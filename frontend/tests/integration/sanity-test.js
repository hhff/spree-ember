import Ember from 'ember';
import { test } from 'ember-qunit';
import startApp from '../helpers/start-app';

var App;

module('Sanity Check', {
  setup: function() {
    App = startApp();
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