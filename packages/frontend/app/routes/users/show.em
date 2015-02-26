`import SpreeRouteSetup from 'ember-cli-spree-frontend/mixins/route-setup'`
`import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';`

class UsersShowRoute extends Ember.Route with AuthenticatedRouteMixin, SpreeRouteSetup

`export default UsersShowRoute;`