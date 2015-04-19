import DeviseAuthenticator from 'simple-auth-devise/authenticators/devise';
/**
  The Spree Authenticator is responsible for Authenticating users against  your 
  Spree store.  It assumes your server has the `spree_ams` gem installed.  The Spree
  Auth initializer with dynamically create and set the Server Token Endpoint from
  the Spree Core Adapter.

  @class Authenticator
  @extends SimpleAuthDevise.Authenticator
*/
export default DeviseAuthenticator.extend({
  /**
    The endpoint where the Authenticator will attempt to Authenticate Users.  This
    is set dynamically by the `spree-ember-auth` initializer, by building a URL
    from the `spree-ember-core` adapter.

    @property serverTokenEndpoint
    @type String
    @readOnly
    @default 'http://localhost:3000/api/ams/users/token'
  */ 
  serverTokenEndpoint: 'http://localhost:3000/api/ams/users/token',
  /**
    The Rails Resource that we're authenticating.  When using Spree's 
    `spree-auth-devise`, this is simply `user`.

    @property resourceName
    @type String
    @readOnly
    @default 'user'
  */
  resourceName: 'user',
  /**
    The name of the unique key returned by the server on a successful authentication.

    @property tokenAttributeName
    @type String
    @readOnly
    @default 'token'
  */
  tokenAttributeName: 'token',
  /**
    The name of the identification attribute of the user.  By default in Spree, 
    this is email.

    @property indentificationAttributeName
    @type String
    @readOnly
    @default 'email'
  */
  identificationAttributeName: 'email'
});
