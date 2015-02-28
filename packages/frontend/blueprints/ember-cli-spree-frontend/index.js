module.exports = {
  description: 'Copies over some files for an Example Spree Frontend.',

  normalizeEntityName: function() {},
  // locals: function(options) {
  //   // Return custom template variables here.
  //   return {
  //     foo: options.entity.options.foo
  //   };
  // }

  // afterInstall: function(options) {
  //   // Perform extra work here.
  // }
  afterInstall: function() {

    return this.addAddonToProject('ember-cli-foundation-sass');
  }
};
