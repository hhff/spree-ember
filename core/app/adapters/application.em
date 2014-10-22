`import DS from 'ember-data'`
`import config from '../config/environment'`

# This is because Pretender can't request full URLS.
if config.environment is 'test'
  class ApplicationAdapter extends DS.ActiveModelAdapter
    namespace: 'api/ams'
else
  class ApplicationAdapter extends DS.ActiveModelAdapter
    namespace: 'api/ams'
    host: config.spreeApiHost

    +computed spree.guestToken spree.orderId
    headers: ->
      if @spree.guestToken and @spree.orderId
        "X-Spree-Order-Token": @spree.guestToken
        "X-Spree-Order-Id": @spree.orderId

`export default ApplicationAdapter`