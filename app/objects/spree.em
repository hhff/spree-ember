class Spree extends Ember.Object
  key: 'spree_ember'

  orderToken: null
  orderId: null

  init: ->
    @restore @localStorageData()

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

  +computed orderId
  currentOrder: ->
    if @orderId
      @container.lookup('store:main').find('order', @orderId)

`export default Spree`