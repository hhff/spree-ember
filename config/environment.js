/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'ember-cli-spree-frontend',
    environment: environment,
    baseURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    ENV.APP.LOG_VIEW_LOOKUPS = true;

    ENV.contentSecurityPolicy = {
    'default-src': "'none'",
    'font-src': "'self' http://fonts.gstatic.com",
    'connect-src': "'self' http://localhost:3000/",
    'img-src': "'self' http://localhost:3000/",
    'style-src': "'self' http://fonts.googleapis.com/"
    };

    ENV.spreeApiHost = 'http://localhost:3000'

    ENV['simple-auth'] = {
      authorizer: 'simple-auth-authorizer:devise',
      authenticationRoute: 'users.login',
      crossOriginWhitelist: [ENV.spreeApiHost]
    }

    ENV['simple-auth-devise'] = {
      serverTokenEndpoint: ENV.spreeApiHost+'/api/ams/users/token'
    }

  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'auto';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';

    ENV.spreeApiHost = 'http://localhost:4200'

    ENV.contentSecurityPolicy = {
    'default-src': "'none'",
    'font-src': "'self' http://fonts.gstatic.com",
    'connect-src': "'self' http://localhost:3000/",
    'img-src': "'self' http://localhost:3000/",
    'style-src': "'self' http://fonts.googleapis.com/"
    };

    ENV['simple-auth'] = {
      store: 'simple-auth-session-store:ephemeral'
    }
  }

  if (environment === 'production') {

  }

  return ENV;
};
