'use strict';

module.exports = function(/* environment, appConfig */) {
  return { 
    "spree": {
      signinPath: 'signin',
      signupPath: 'signup',
      accountPath: 'account'
    },
    "simple-auth": {
      localStorageKey: 'spree-ember:session',
      authorizer: 'simple-auth-authorizer:spree',
      crossOriginWhitelist: ['http://localhost:3000'],
      authenticationRoute: 'spree.signin',
      routeAfterAuthentication: "spree.account",
      routeIfAlreadyAuthenticated: "spree.account"
    }
  };
};
