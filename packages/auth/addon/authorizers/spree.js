import DeviseAuthorizer from 'simple-auth-devise/authorizers/devise';
import Ember from 'ember';
/**
  The Authorizer is responsible for ensuring that each Authorized clientside request
  contains the `X-Spree-Token` Header.  This loads the `@current_api_user` 
  attribute in Spree, so that the User can successfully interact with the API.

  @class Authorizer
  @extends SimpleAuthDevise.Authorizer
*/
export default DeviseAuthorizer.extend({
  /**
    The token attribute name.  The Spree AMS Gem uses `token`.
    
    @property tokenAttributeName
    @type String
    @default 'token'
  */
  tokenAttributeName: 'token',
  /**
    Authorizes an XHR request by sending the `X-Spree-Token` header when the 
    `session` is Authenticated.

    @method authorize
    @param {jqXHR} jqXHR The XHR request to authorize (see http://api.jquery.com/jQuery.ajax/#jqXHR)
  */ 
  authorize: function(jqXHR) {
    var secureData         = this.get('session.secure');
    var userToken          = secureData[this.tokenAttributeName];
    if (this.get('session.isAuthenticated') && !Ember.isEmpty(userToken)) {
      jqXHR.setRequestHeader('X-Spree-Token', userToken); 
    }
  }
});
