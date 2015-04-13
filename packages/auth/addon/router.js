/**
  The Spree Auth router is designed to be imported by a host application's Router
  to setup the default routes required for Spree Auth.

  **Note:** If you're setting a Mount Point, it must be the same as the 
  Mount Point set for the `spree-ember-storefront` router.

  In `router.js`:
  
  ```javascript
  import Ember from 'ember';
  import config from './config/environment';

  import spreeRouter from 'spree-ember-storefront/router';
  import spreeAuthRouter from 'spree-ember-auth/router';

  var Router = Ember.Router.extend({
    location: config.locationType
  });

  Router.map(function() {
    spreeRouter(this, {
      mountPath:    '/spree',
      cartPath:     'cart',
      productsPath: 'products',
      checkoutPath: 'checkout'
    });

    // You'll get an error if your Mount Path is different to your Spree Router,
    // these need to match.
    spreeAuthRouter(this, {
      mountPath:   '/spree',
      signinPath:  'login',
      signupPath:  'new',
      accountPath: 'profile'
    });
  });

  export default Router;
  ```

  @class Router
*/
export default function(router, options) {

  options = options || {};
  
  var mountPath   = options['mountPath']   || '/spree';
  var signinPath  = options['signinPath']  || 'signin';
  var signupPath  = options['signupPath']  || 'signup';
  var accountPath = options['accountPath'] || 'account';

  router.resource('spree', { path: mountPath }, function() {
    this.route('signin', { path: signinPath });
    this.route('signup', { path: signupPath });
    this.route('account', { path: accountPath });
  });
}

