`import Spree from '../singletons/spree'`

Initializer =
  name: 'initialize-spree-global'
  after: 'customize-simple-auth'
  initialize: (container, application) ->

    application.register 'spree:main', Spree, instantiate: true, singleton: true
    application.inject 'controller', 'spree', 'spree:main'

`export default Initializer`