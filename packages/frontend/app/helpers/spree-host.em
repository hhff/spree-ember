`import config from '../config/environment'`

spreeHost = Ember.Handlebars.makeBoundHelper (path) ->
  "#{config.spreeConfig.apiHost}#{path}"

`export default spreeHost`