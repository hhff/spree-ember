import Configuration from 'simple-auth-devise/configuration';
import Authenticator from 'simple-auth-devise/authenticators/devise';
import Authorizer from 'simple-auth-devise/authorizers/devise';
import ENV from '../config/environment';

export default {
  name:       'simple-auth-devise',
  before:     'simple-auth',
  initialize: function(container, application) {
    Configuration.load(container, ENV['simple-auth-devise'] || {});
    container.register('simple-auth-authorizer:devise', Authorizer);
    container.register('simple-auth-authenticator:devise', Authenticator);
  }
};
