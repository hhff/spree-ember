`import config from '../config/environment'`

spreeHost = Ember.Handlebars.makeBoundHelper (path) ->
  "#{config.spreeApiHost}#{path}"

`export default spreeHost`