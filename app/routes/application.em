`import ApplicationRouteMixin from 'simple-auth/mixins/application-route-mixin'`

class ApplicationRoute extends Ember.Route with ApplicationRouteMixin
  init: ->
    @spree.on 'spreeOrderDidAdvance', =>
      @transitionTo 'checkout'

    @spree.on 'spreeOrderDidNotAdvance', (error) =>
      switch error.statusText
        when 'Not Found'
          @flash.pushFlash 'Order could not be found in the backend.',
            type: 'error'
          @spree.currentOrder = null
          @transitionTo 'index'
        else
          debugger
          @flash.pushFlash 'Order could not transition.',
            type: 'error'

    @spree.on 'spreeOrderCanNotAdvance', =>
      # Ensure we're on the correct route, show
      # a message, else transition to checkout
      @transitionTo 'checkout'

  actions:
    sessionAuthenticationFailed: (error) ->
      @flash.pushFlash 'Invalid email or password.',
        type: 'error'
        isNagging: true

`export default ApplicationRoute`