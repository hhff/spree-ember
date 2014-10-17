`import ApplicationRouteMixin from 'simple-auth/mixins/application-route-mixin'`

class ApplicationRoute extends Ember.Route with ApplicationRouteMixin
  actions:
    sessionAuthenticationFailed: (error) ->
      debugger

`export default ApplicationRoute`