class FlashMessage extends Ember.Object
  timeout: null
  type: null
  message: null
  isNagging: false

  +computed type
  isNotice: -> @type == "notice"

  +computed type
  isWarning: -> @type == "warning"

  +computed type
  isError: -> @type == "error"

`export default FlashMessage`
