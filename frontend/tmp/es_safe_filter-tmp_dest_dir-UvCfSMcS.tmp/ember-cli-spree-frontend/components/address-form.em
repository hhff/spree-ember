`import config from '../config/environment'`

class AddressFormComponent extends Ember.Component
  address: null
  addressKind: null

  +computed addressKind
  addressPrefix: -> @addressKind.charAt 0

  companyAddress: config.spreeConfig.companyAddress
  alternativePhone: config.spreeConfig.alternativePhone
  requiresState: config.spreeConfig.requiresState
  requiresPhone: config.spreeConfig.requiresPhone

`export default AddressFormComponent`