/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-cli-spree-checkouts',

  isDevelopingAddon: function() {
    return true;
  },

  included: function(app, parentAddon) {
    var target = (parentAddon || app);
    this._super.included(target);
    target.import('vendor/state-machine.min.js');
  }
};
