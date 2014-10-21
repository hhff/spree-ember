`import Spree from '../singletons/spree'`

Initializer =
  name: 'initialize-spree-global'
  after: 'customize-simple-auth'
  initialize: (container, application) ->
    console.log 'init!'

`export default Initializer`