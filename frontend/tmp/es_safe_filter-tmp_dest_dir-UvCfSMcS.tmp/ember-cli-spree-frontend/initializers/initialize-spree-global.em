`import Spree from '../objects/spree'`

Initializer =
  name: 'initialize-spree-global'
  initialize: (container, application) ->

    application.register 'spree:main', Spree, instantiate: true, singleton: true
    application.inject 'spree:main', 'store', 'store:main'

    application.inject 'controller', 'spree', 'spree:main'
    application.inject 'route', 'spree', 'spree:main'
    application.inject 'adapter:application', 'spree', 'spree:main'


`export default Initializer`