/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-cli-spree-checkouts',

  isDevelopingAddon: function() {
    return true;
  },

  included: function(app) {
    this._super.included(app);
    app.import('vendor/state-machine.min.js');
  }
};
