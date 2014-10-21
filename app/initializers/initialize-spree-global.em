`import Session from 'simple-auth/session'`
`import Devise from 'simple-auth-devise/authorizers/devise'`

Initializer =
  name: 'customize-simple-auth'
  before: 'simple-auth'
  initialize: (container, application) ->

    Devise.reopen
      authorize: (jqXHR, requestOptions) ->
        @_super.apply @, arguments
        jqXHR.setRequestHeader 'X-Spree-Token', @session.user_token

    Session.reopen
      +computed user_id
      currentUser: ->
        if userId = @user_id
          @container.lookup('store:main').find 'user', userId

`export default Initializer`