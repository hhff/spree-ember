export function initialize(container, application) {
  var SpreeAdapter = container.lookup('adapter:-spree');
  var Session      = container.lookup('simple-auth-session:main');

  Session.reopen({
    currentUser: null,

    secureIdDidChange: Ember.observer('secure.id', function() {
      var userId = this.get('secure.id');
      if (userId) {
        var _this = this;
        this.get('container').lookup('service:spree').store.find('user', userId).then(
          function(currentUser) {
            _this.set('currentUser', currentUser);
          },
          function(error) {
            _this.invalidate();
          }
        );
      }
    })
  });
}

export default {
  name: 'spree-ember-auth-setup-session',
  after: ['spree-ember-core', 'simple-auth', 'spree-ember-auth'],
  initialize: initialize
};
