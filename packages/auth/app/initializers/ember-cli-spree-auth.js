import Session from 'simple-auth/session';
import Devise from 'simple-auth-devise/authorizers/devise';
import ENV from '../config/environment';

export function initialize(container, application) {

  var SpreeAdapter = container.lookup('adapter:-spree');

  ENV['simple-auth']                         = ENV['simple-auth'] || {};
  ENV['simple-auth']['authenticationRoute']  = ENV['simple-auth']['authenticationRoute'] || 'users.login';
  ENV['simple-auth']['authorizer']           = 'simple-auth-authorizer:devise';
  ENV['simple-auth']['authenticator']        = 'simple-auth-authenticator:devise';
  ENV['simple-auth']['localStorageKey']      = 'spree-ember:session';
  ENV['simple-auth']['crossOriginWhiteList'] = SpreeAdapter.get('host');

  ENV['simple-auth-devise']                        = ENV['simple-auth-devise'] || {};
  ENV['simple-auth-devise']['serverTokenEndpoint'] = SpreeAdapter.buildURL('user')+"/token";

  application.Router.map(function() {
    this.resource('users', function() {
      this.route('login');
      this.route('new');
    })
  })

  Devise.reopen({
    authorize: function(jqXHR, requestOptions) {
      this._super.apply(this, arguments);
      jqXHR.setRequestHeader('X-Spree-Token', this.get('session.user_token'));
    }
  });

  Session.reopen({
    currentUser: Ember.computed('user_id', function() {
      var userId = this.get('user_id');
      if (userId) {
        return this.get('container').lookup('store:spree').find('user', userId);
      }
    })
  });
}

export default {
  name: 'ember-cli-spree-auth',
  before: 'simple-auth',
  after: 'ember-cli-spree-core',
  initialize: initialize
};
