class FlashView extends Ember.View
  classNames: ['flash-messages']
  classNameBindings: ['type', 'queueName']
  type: 'inactive'
  queue: null
  queueName: null
  currentMessage: null
  templateName: 'flash-outlet'

  didInsertElement: ->
    @queueName = @flash.defaultQueueName unless @queueName
    @queue = @flash.findOrCreateQueue @queueName

  click: -> @queue.dismissFlash()

  +observer queue.[]
  queueContentChanged: ->
    if @currentMessage = @queue?.objectAt 0
      @type = @currentMessage.type
    else
      @type = 'inactive'

`export default FlashView`