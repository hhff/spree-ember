`import config from './config/environment'`

class Router extends Ember.Router
  location: config.locationType

Router.map ->
  @route "index", { path: "/" }

  @resource 'users', ->
    @route 'show'
    @route 'login'
    @route 'edit'

`export default Router`