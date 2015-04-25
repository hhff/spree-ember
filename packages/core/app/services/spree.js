import Ember from 'ember';
import Storable from 'spree-ember-core/mixins/storable';

/**
  The Spree service is the central place a Spree Ember developer will interact
  with Spree, via Spree Ember.  The core object is injected into the host application's
  routes & controllers, and is responsible for persisting data to Local Storage,
  communicating with your Spree backend, Acting as a Registry for other Spree Ember
  packages, and Acting as an Event Bus for your application Frontend, and providing
  a seperate Store.

  @class Spree
  @namespace SpreeEmber
  @module spree-ember-core/services/spree
  @extends Ember.Object
  @uses Ember.Evented, SpreeEmber.Storable, SpreeEmber.Store
*/

export default Ember.Object.extend(Ember.Evented, Storable, {
  /**
    The Local Storage key we use to Restore and Persist data across browser refreshes.

    @property localStorageKey
    @type String
    @default "spree-ember"
  */
  
  localStorageKey: 'spree-ember',
  /**
    A computed property that returns all of the countries (and states) set up in
    Spree's backend.

    @property countries
    @type Computed
    @return {Ember.RSVP.Promise} Returns a promise that resolves to all of the
    countries saved in the Spree backend.
  */
  countries: Ember.computed(function() {
    return this.store.find('country');
  }),

  /**
    A copy of the "spree" entry in the Host Application environment config.

    @property config
    @type Object
    @default {}
  */
  config: {},

  /**
    A copy of the Host Application's current environment name.

    @property environment
    @type Object
    @default 'development'
  */
  environment: 'development'
});




