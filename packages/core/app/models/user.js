import DS from 'ember-data';

export default DS.Model.extend({
  authenticationToken:  DS.attr('string'),
  createdAt:            DS.attr('date'),
  currentSignInAt:      DS.attr('date'),
  email:                DS.attr('string', { persistToServer: true }),
  failedAttempts:       DS.attr('number'),
  lastRequestAt:        DS.attr('date'),
  lockedAt:             DS.attr('date'),
  login:                DS.attr('string'),
  perishableToken:      DS.attr('string'),
  persistenceToken:     DS.attr('string'),
  rememberCreatedAt:    DS.attr('date'),
  rememberToken:        DS.attr('string'),
  resetPasswordSentAt:  DS.attr('date'),
  resetPasswordToken:   DS.attr('string'),
  signInCount:          DS.attr('number'),
  spreeApiKey:          DS.attr('string'),
  unlockToken:          DS.attr('string'),
  updatedAt:            DS.attr('date'),
  password:             DS.attr('string', { persistToServer: true }),
  passwordConfirmation: DS.attr('string', { persistToServer: true })
});
