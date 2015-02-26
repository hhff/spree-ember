`import FlashView from "../views/flash-outlet"`
`import FlashController from "../controllers/flash"`

Initializer =
  name: 'setup-flash-messages'
  initialize: (container, application) ->
    application.register 'flash:main', FlashController, instantiate: true, singleton: true
    application.inject 'controller', 'flash', 'flash:main'
    application.inject 'route', 'flash', 'flash:main'
    application.inject 'view:flash-outlet', 'flash', 'flash:main'

`export default Initializer`