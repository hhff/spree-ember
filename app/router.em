`import config from './config/environment'`

class Router extends Ember.Router
  location: config.locationType

Router.map ->
  @route "index", { path: "/" }

`export default Router`