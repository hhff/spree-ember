/* jshint node: true */
'use strict';

module.exports = {
  name: 'spree-ember-auth',

  isDevelopingAddon: function() {
    return true;
  },

  included: function(app) {
    this._super.included(app);
    
    /* Here we call included on any nested Spree Ember Dependencies */
    this.addons.forEach(function(addon){
      if (addon.name.substring(0, 11)  === "spree-ember") {
        addon.included.apply(addon, [app]);
      }
    });
    
    app.import('vendor/register-auth.js');

    app.import(app.bowerDirectory + '/ember-simple-auth/simple-auth.amd.js', {
      exports: {
        'simple-auth/authenticators/base':                    ['default'],
        'simple-auth/authorizers/base':                       ['default'],
        'simple-auth/mixins/application-route-mixin':         ['default'],
        'simple-auth/mixins/authenticated-route-mixin':       ['default'],
        'simple-auth/mixins/unauthenticated-route-mixin':     ['default'],
        'simple-auth/mixins/authentication-controller-mixin': ['default'],
        'simple-auth/mixins/login-controller-mixin':          ['default'],
        'simple-auth/stores/base':                            ['default'],
        'simple-auth/stores/ephemeral':                       ['default'],
        'simple-auth/stores/local-storage':                   ['default'],
        'simple-auth/session':                                ['default'],
        'simple-auth/configuration':                          ['default'],
        'simple-auth/setup':                                  ['default']
      }
    });

    app.import(app.bowerDirectory + '/ember-simple-auth/simple-auth-devise.amd.js', {
      exports: {
        'simple-auth-devise/authenticators/devise': ['default'],
        'simple-auth-devise/authorizers/devise':    ['default'],
        'simple-auth-devise/configuration':         ['default']
      }
    });
  }
};
