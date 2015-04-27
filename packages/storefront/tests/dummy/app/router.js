import Ember from 'ember';
import config from './config/environment';
import spreeRouter from 'spree-ember-storefront/router';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  spreeRouter(this, config);
});

export default Router;
