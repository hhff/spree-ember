`import LoginControllerMixin from 'simple-auth/mixins/login-controller-mixin'`

class UsersLoginController extends Ember.Controller with LoginControllerMixin
  authenticator: 'simple-auth-authenticator:devise'

`export default UsersLoginController`