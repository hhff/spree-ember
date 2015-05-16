import Ember from 'ember';
import layout from '../templates/components/spree-auth';
/**
  A simple Fieldset that doubles as a Signin & Signup form.  Sends action:
  `authenticateUser` or `createAndAuthenticateUser` depending on whether
  `isSignup` is set to `true` or `false`.

  **To Override:** You'll need to run the generator:

  ```bash
  ember g spree-ember-auth-component
  ```

  This will install all of the Spree Ember Auth component files into your
  host application at `app/components/spree-*.js`, ready to be extended or
  overriden.

  @class SpreeAuth
  @namespace Component
  @extends Ember.Component
*/
export default Ember.Component.extend({
  layout: layout,
  /**
    The mode of the component.

    @property isSignup
    @type Boolean
    @default false
  */
  isSignup: false,
  /**
    An array of server errors.

    @property errors
    @type Object
    @default {}
  */
  errors: {},
  /**
    The action that is sent when `isSignup` is `false`.  This is caught by the action
    defined in the `spree-auth-user-route-mixin`.

    @property authAction
    @type String
    @default 'authenticateUser'
  */
  authAction: 'authenticateUser',
  /**
    The action that is sent when `isSignup` is `true`.  This is caught by the action
    defined in the `spree-auth-user-route-mixin`.

    @property createAction
    @type String
    @default 'createAndAuthenticateUser'
  */
  createAction: 'createAndAuthenticateUser',
  identification: null,
  password: null,
  passwordConfirmation: null,

  actions: {
    submit: function() {
      var identification       = this.get('identification');
      var password             = this.get('password');
      var passwordConfirmation = this.get('passwordConfirmation');

      var action = this.get('isSignup') ? 'createAction' : 'authAction';

      this.sendAction(action, {
        identification: identification,
        password: password,
        passwordConfirmation: passwordConfirmation
      }, this);
    }
  },
  identificationDidChange: Ember.observer('identification', function() {
    this.set('errors.email', null);
  }),
  passwordDidChange: Ember.observer('password', function() {
    this.set('errors.password', null);
  }),
  passwordConfirmationDidChange: Ember.observer('passwordConfirmation', function() {
    this.set('errors.passwordConfirmation', null);
  })
});
