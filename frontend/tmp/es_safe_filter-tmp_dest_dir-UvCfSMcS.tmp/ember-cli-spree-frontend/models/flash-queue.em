`import FlashMessage from "../models/flash-message"`

class FlashQueue extends Ember.ArrayController
  queueName: null
  timer: null

  defaultType: "notice"
  defaultTimeout: 4000

  pushFlash: (message, params) ->
    params ?= { }
    @pushObject FlashMessage.create
      message:      message
      type:         params.type ? @defaultType
      isNagging:    params.isNagging ? false
      flashTimeout: params.flashTimeout ? @defaultTimeout

  dismissFlash: ->
    Ember.run.cancel @timer if @timer
    @timer = null
    @removeObject @objectAt 0

  +observer content.[]
  contentChanged: ->
    unless @timer or Ember.empty @content
      currentMessage = @objectAt 0
      unless currentMessage.isNagging
        @timer = Ember.run.later @, @dismissFlash, currentMessage.flashTimeout

`export default FlashQueue`
