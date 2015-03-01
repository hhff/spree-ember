import Ember from 'ember';
import { initialize } from 'ember-cli-spree-core/initializers/ember-cli-spree-core';
import { module, test } from 'qunit';

var container, application;

module('InitializeEmberCliSpreeCoreInitializer', {
  setup: function() {
    Ember.run(function() {
      container = new Ember.Container();
      application = Ember.Application.create();
      application.deferReadiness();
    });
  }
});

// Replace this with your real tests.
test('it works', function(assert) {
  initialize(container, application);

  // you would normally confirm the results of the initializer here
  assert.ok(true);
});

