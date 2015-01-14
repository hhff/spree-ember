class Spree extends Ember.Object with Ember.Evented
  key: 'spree_ember'

  # todo globalize environment config

  orderToken: null
  orderId: null

  init: ->
    @restore @localStorageData()

  # Persist Order Details to Local Storage
  persist: (data) ->
    @restore data
    data = JSON.stringify data or {}
    localStorage.setItem @key, data

  restore: (data) ->
    for key, value of data
      @set key, value

  localStorageData: ->
    data = localStorage.getItem @key
    JSON.parse data or "{}"

  clear: ->
    localStorage.removeItem @key

  # TODO - This needs to save to local storage
  clearCurrentOrder: ->
    @orderId = null


  +computed orderId
  currentOrder: ->
    @store.find('order', @orderId) if @orderId

  # TODO - The developer should be able to
  # overwrite these steps.
  +computed currentOrder.state
  currentOrderCanAdvance: ->
    switch @currentOrder.state
      when 'cart' then true
      when 'address'
        @currentOrder.shipAddress and @currentOrder.billAddress
      when 'delivery'
        false
        # Has shipping rate for each shipment
      when 'payment'
        false
        # Order has a Payment
      when 'confirm' then true
      when 'complete' then false

  advanceOrderState: ->
    if @currentOrderCanAdvance
      @applicationAdapter.ajax(@nextURL, 'PUT').then(
        (order) =>
          @store.pushPayload order
          @trigger 'spreeOrderDidAdvance'
        (error) =>
          @trigger 'spreeOrderDidNotAdvance', error
      )
    else
      @trigger 'spreeOrderCanNotAdvance'

  saveCurrentOrder: ->
    @currentOrder.save().then(
      (order) =>
        debugger
      (error) =>
        debugger
    )


  +computed container
  applicationAdapter: ->
    @container.lookup('adapter:application')

  +computed orderId
  nextURL: ->
    "#{@applicationAdapter.buildURL('checkout', @currentOrder.id)}/next.json}"

`export default Spree`