/* jshint node: true */
'use strict';

module.exports = {
  name: 'spree-ember-checkouts',

  included: function(app) {
    this._super.included(app);
    app.import('vendor/state-machine.min.js');
    app.import('vendor/register-checkouts.js');
  }
};
