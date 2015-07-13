import Session from 'simple-auth/session';
import Authorizer from 'spree-ember-auth/authorizers/spree';
import Authenticator from 'spree-ember-auth/authenticators/spree';

export function initialize(registry, application) {
  var container = application.__container__; //TODO: remove deprecation

  application.register('simple-auth-authorizer:spree', Authorizer);
  application.register('simple-auth-authenticator:spree', Authenticator);

  var SpreeAuthorizer    = container.lookup('simple-auth-authorizer:spree');
  var SpreeAuthenticator = container.lookup('simple-auth-authenticator:spree');
  var SpreeAdapter       = container.lookup('adapter:-spree');

  SpreeAuthenticator.set('serverTokenEndpoint', SpreeAdapter.buildURL('user')+'/token');
}

export default {
  name: 'spree-ember-auth',
  before: 'simple-auth',
  after: 'spree-ember-core',
  initialize: initialize
};
