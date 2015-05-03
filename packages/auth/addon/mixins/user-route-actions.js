import Ember from 'ember';
/**
  A mixin for providing utility methods to routes associated with User behaviour.
  These are grouped together in the case the ambitious developers want to glob this
  behaviour together into a single route, for a highly interactive experience.

  **Important:** The `spree-ember-auth` install generator will attempt to overwrite your application
  route.  If you opt out of this, or you're defining it in a pod instead, you'll
  need to ensure that you're mixing Simple Auth's Application Route Mixin into your
  application route.

  ```bash
  import ApplicationRouteMixin from 'simple-auth/mixins/application-route-mixin';
  ```

  This is essentially a thin wrapper on Ember Simple Auth.  If you'd like to
  modify behaviour or catch events relating to Authentication, please refer to
  the [Simple Auth Documentnation](http://ember-simple-auth.com/ember-simple-auth-api-docs.html)

  @class UserRouteActions
  @extends Ember.Mixin
*/

export default Ember.Mixin.create({
  /**
    Triggered on the `spree` service whenever a user is successfully created 
    through the `createAndAuthenticateUser` call.

    @event didCreateUser
    @param {DS.Model} newUser The newly created user model. 
  */

  /**
    Triggered on the `spree` service whenever the `createAndAuthenticateUser`
    call fails to create a new user.

    @event userCreateFailed
    @param {Error} error The server error. 
  */

  /**
    Triggered on the `spree` service whenever the `updateCurrentUser`
    call updates the current user successfully.

    @event didUpdateCurrentUser
    @param {DS.Model} currentUser The newly updated Current User. 
  */

  /**
    Triggered on the `spree` service whenever the `updateCurrentUser`
    call updates the current user successfully.

    @event currentUserUpdateFailed 
    @param {Error} error The server error. 
  */
  /**
    The `authenticateUser` call simply wraps the `session#authenticate` method
    provided by Ember Simple Auth.

    @method extractAuthErrors 
    @param {Object} serverError A JSON Payload containing server errors.
    @return {Object} A normalized errors object.
  */
  extractAuthErrors: function(serverError) {
    serverError.errors = serverError.errors || {};

    var errors = {};
    for (var key in serverError.errors) {
      errors[key] = [{
        attribute: Ember.String.camelize(key),
        message: serverError.errors[key]
      }];
    }
    return errors;
  },
  actions: {
    /**
      The `authenticateUser` call simply wraps the `session#authenticate` method
      provided by Ember Simple Auth.

      @method authenticateUser
      @param {Object} params A javascript object with identification, password, 
      and password confirmation (optional).
      @return {Ember.RSVP.Promise} A promise that resolves successfully on a
      successful authentication.
    */
    authenticateUser: function(params, authComponent) {
      var _this = this;

      authComponent.set('errors', null);
      return this.get('session').authenticate('simple-auth-authenticator:spree', params).catch(function(serverError) {
        authComponent.set('errors', _this.extractAuthErrors(serverError));
      });
    },
    /**
      The `createAndAuthenticateUser` method attempts to create a new Spree User,
      and when successful, triggers the `authenticateUser` action.
      
      @method createAndAuthenticateUser
      @param {Object} params A javascript object with identification, password, 
      and password confirmation (optional).
      @return {Ember.RSVP.Promise} A promise that resolves successfully on a
      successful create then authenticate.
    */
    createAndAuthenticateUser: function(params, authComponent) {
      var _this   = this;
      
      authComponent.set('errors', null);
      var newUser = this.spree.store.createRecord('user', { 
        email: params.identification,
        password: params.password,
        passwordConfirmation: params.passwordConfirmation
      });
      
      return newUser.save().then(
        function(newUser) {
          _this.spree.trigger('didCreateUser', newUser);
          return _this.send('authenticateUser', params, authComponent);
        },
        function(serverError) {
          _this.spree.trigger('userCreateFailed', serverError);
          _this.spree.trigger('serverError', serverError);
          authComponent.set('errors', _this.extractAuthErrors(serverError));
          return serverError;
        }
      );
    },
    /**
      The `updateCurrentUser` method attempts to save/update the current Spree user.
      It expects that changes to the `session.currentUser` model have been made
      in place, and doesn't take any arguments.
      
      @method createAndAuthenticateUser
      @return {Ember.RSVP.Promise} A promise that resolves to the `currentUser`
      when successful.
    */
    updateCurrentUser: function() {
      var _this = this;
      return this.get('session.currentUser').save().then(
        function(currentUser) {
          _this.spree.trigger('didUpdateCurrentUser', currentUser);
          return currentUser;
        },
        function(error) {
          _this.spree.trigger('currentUserUpdateFailed', error);
          _this.spree.trigger('serverError', error);
          return error;
        }
      );
    }
  }
});
