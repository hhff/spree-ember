module.exports = {
  description: 'Installs Zurb Foundation for Spree Ember.',

  normalizeEntityName: function() {},

  afterInstall: function() {
    return this.addAddonToProject('ember-cli-foundation-sass');
  }
};
