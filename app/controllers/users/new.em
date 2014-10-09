class UsersNewontroller extends Ember.Controller
  actions:
    createUser: ->
      password = @model.password
      @model.save().then(
        (user) =>
          @session.authenticate('simple-auth-authenticator:devise', {
            identification: user.email
            password: password
          }).then(
            -> console.log 'user created and authenticated'
            -> console.log 'user created but NOT authenticated'
          )
        (error) ->
          console.log 'failz'
      )

`export default UsersNewontroller`