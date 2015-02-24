import Ember from 'ember';
import Storable from 'ember-cli-spree-core/mixins/storable';

/**
  The Spree Service is the central place a Spree Ember developer will interact
  with Spree, via Spree Ember.  The core object is responsible for persisting data
  to Local Storage, communicating with your Spree backend, Acting as a Registry
  for other Spree Ember packages, and Acting as an Event Bus for your application
  Frontend, and providing a seperate Store.

  @class Spree
  @namespace Spree Ember
  @module ember-cli-spree-core/services/spree
  @extends Ember.Object
  @uses Ember.Evented, Storable
*/

export default Ember.Object.extend(Ember.Evented, Storable, {
  /**
    The Local Storage key we use to Restore and Persist data across browser refreshes.

    @property localStorageKey
    @type String
    @for Storable
    @default "spree_ember"
  */
  localStorageKey: 'spree_ember',

  /**
    A copy of the "spree" entry in the application Config.

    @property config
    @type Object
    @default {}
  */
  config: {},

  /**
    A copy of the host application's current environment.

    @property environment
    @type Object
    @default 'development'
  */
  environment: 'development'
});




