import Ember from 'ember';

export default Ember.Mixin.create({
  init() {
    this._super.apply(this, arguments);
    this.restore(this.localStorageData());
  },
  localStorageKey: 'storable',
  persist: function(data) {
    var key  = this.get('localStorageKey');
    this.restore(data);
    var data = JSON.stringify(data || {})
    localStorage.setItem(key, data);
    return true;
  },

  restore: function(data) {
    for (var key in data) {
      this.set(key, data[key]);
    }
    return true;
  },

  localStorageData: function() {
    var data   = localStorage.getItem(this.get('localStorageKey'));
    var parsed = JSON.parse(data || "{}");
    return parsed;
  },
});
