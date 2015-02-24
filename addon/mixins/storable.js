import Ember from 'ember';

/**
  Storable bolts onto an Ember Object and provides functionality for persisting key
  value pairs to Local Storage.

  @class Storable
  @namespace Spree Ember
  @module ember-cli-spree-core/mixins/storable
  @extends Ember.Mixin
*/
export default Ember.Mixin.create({

  /**
    The Local Storage key we use to Restore and Persist data across browser refreshes.

    @property localStorageKey
    @type String
    @readOnly
    @default 'storable'
  */
  localStorageKey: 'storable',

  /**
    Overrides the `init` method for the object.  HWhen an object is initialized,
    it will automatically request data from `localStorage` and set those key value
    pairs on the object.

    @method init
    @return {Boolean} Will always resolve to `true`.
  */
  init: function() {
    this._super.apply(this, arguments);
    return this.restore(this._getLocalStorageData());
  },

  /**
    Persists an object to Local Storage.

    @method persist
    @param {Object} data A Javascript Object to persist to Local Storage.
    @return {Boolean} Will always resolve to `true`.
  */
  persist: function(data) {
    var key = this.get('localStorageKey');
    this.restore(data);
    var data = JSON.stringify(data || {})
    localStorage.setItem(key, data);
    return true;
  },

  /**
    Sets key value pairs on the Host object.

    @method restore
    @param {Object} data A Javascript Object to set on the Ember Object.
    @return {Boolean} Will always resolve to `true`.
  */
  restore: function(data) {
    for (var key in data) {
      this.set(key, data[key]);
    }
    return true;
  },

  /**
    Returns an object of Key Value pairs from local storage.

    @method restore
    @private
    @return {Object} An object of Key Value pairs from local storage.
  */
  _getLocalStorageData: function() {
    var data   = localStorage.getItem(this.get('localStorageKey'));
    var parsed = JSON.parse(data || "{}");
    return parsed;
  },
});
