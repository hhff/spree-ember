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
  }
});
