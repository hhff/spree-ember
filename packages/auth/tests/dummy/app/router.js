import Ember from 'ember';
import config from './config/environment';
import spreeAuthRouter from 'spree-ember-auth/router';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  spreeAuthRouter(this);
});

export default Router;
