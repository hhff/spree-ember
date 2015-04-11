import Ember from 'ember';
import config from './config/environment';
import spreeRouter from 'ember-cli-spree-frontend/router';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  spreeRouter(this, {
    mountPath: '/',
    productsPath: '/items'
  });
});

export default Router;
