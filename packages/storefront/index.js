/* jshint node: true */
'use strict';

module.exports = {
  name: 'spree-ember-storefront',

  included: function(app) {
    // Nested Addons don't contribute to the Host Application filestructure.
    // To ensure the initializers from core and checkouts are run, we include
    // them as dependencies rather than devDependencies, and manually invoke
    // the Addon included hooks as necessary.
    this.addons.forEach(function(addon){
      if (addon.name === "spree-ember-checkouts") {
        addon.included.apply(addon, [app]);
      }
    });
  }
};
