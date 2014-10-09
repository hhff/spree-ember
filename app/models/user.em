`import DS from "ember-data"`

class User extends DS.Model
  authenticationToken: DS.attr 'string'
  createdAt: DS.attr 'string'
  currentSignInAt: DS.attr 'string'
  email: DS.attr 'string'
  failedAttempts: DS.attr 'number'
  lastRequestAt: DS.attr 'string'
  lockedAt: DS.attr 'string'
  login: DS.attr 'string'
  perishableToken: DS.attr 'string'
  persistenceToken: DS.attr 'string'
  rememberCreated_at: DS.attr 'string'
  rememberToken: DS.attr 'string'
  resetPasswordSentAt: DS.attr 'string'
  resetPasswordToken: DS.attr 'string'
  signInCount: DS.attr 'number'
  spreeApiKey: DS.attr 'string'
  unlockToken: DS.attr 'string'
  updatedAt: DS.attr 'string'

  # These never come down from the server.
  password: DS.attr 'string'
  passwordConfirmation: DS.attr 'string'

`export default User`