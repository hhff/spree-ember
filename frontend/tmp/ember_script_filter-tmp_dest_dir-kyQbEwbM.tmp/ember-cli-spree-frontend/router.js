import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('index', { path: "/" });

  this.route('cart');

  this.resource('users', function(){
    this.route('show');
    this.route('login');
    this.route('edit');
    this.route('new');
  });

  this.resource('products', function(){
    this.route('show', { path: '/:slug' });
  });

  this.resource('checkout', function(){
    this.route('registration');
    this.route('address');
    this.route('delivery');
    this.route('payment');
  });

});

export default Router;