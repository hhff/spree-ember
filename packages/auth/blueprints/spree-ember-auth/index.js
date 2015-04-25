module.exports = {
  description: 'Adds Ember Simple Auth to the host project.',

  normalizeEntityName: function() {},

  afterInstall: function() {
    return this.addAddonToProject('ember-cli-simple-auth');
  }
};
