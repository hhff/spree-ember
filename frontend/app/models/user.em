`import DS from "ember-data"`

class User extends DS.Model
  authentication_token: DS.attr 'string'
  created_at: DS.attr 'string'
  current_sign_in_at: DS.attr 'string'
  email: DS.attr 'string'
  failed_attempts: DS.attr 'number'
  last_request_at: DS.attr 'string'
  locked_at: DS.attr 'string'
  login: DS.attr 'string'
  perishable_token: DS.attr 'string'
  persistence_token: DS.attr 'string'
  remember_created_at: DS.attr 'string'
  remember_token: DS.attr 'string'
  reset_password_sent_at: DS.attr 'string'
  reset_password_token: DS.attr 'string'
  sign_in_count: DS.attr 'number'
  spreeApiKey: DS.attr 'string'
  unlock_token: DS.attr 'string'
  updated_at: DS.attr 'string'

`export default User`