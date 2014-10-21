`import config from './config/environment'`

class Router extends Ember.Router
  location: config.locationType

Router.map ->
  @route 'index', { path: "/" }

  @route 'cart'

  @resource 'users', ->
    @route 'show'
    @route 'login'
    @route 'edit'
    @route 'new'

  @resource 'products', ->
    @route 'show', { path: '/:slug' }

`export default Router`