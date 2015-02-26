`import FlashQueue from "../models/flash-queue"`

class FlashController extends Ember.Controller
  queues: []
  defaultQueueName: 'main'

  init: ->
    @findOrCreateQueue @defaultQueueName

  findOrCreateQueue: (queueName) ->
    if queue = @queues.findBy 'queueName', queueName
      queue
    else
      @queues.pushObject FlashQueue.create
        queueName: queueName

  # type (string * default: 'notice')
  # nagging (bool * default: false)
  # flashTimeout (int * default: 4000)
  # queueName (string * default: 'main')
  pushFlash: (message, options) ->
    options ?= {}
    queueName = if options.queueName
      options.queueName
    else
      @defaultQueueName

    queue = @findOrCreateQueue queueName
    queue.pushFlash message, options

`export default FlashController`