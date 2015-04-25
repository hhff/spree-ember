/* jshint node: true */
'use strict';

module.exports = {
  name: 'spree-ember-core',

  included: function(app) {
    this._super.included(app);
    app.import('vendor/register-core.js'); 
  }
};
