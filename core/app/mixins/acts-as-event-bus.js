import Ember from 'ember';

export default Ember.Mixin.create({
  init() {
    this._super.apply(this, arguments);
  },
  system: {
    emit: function(params) {
      console.log("Emit Fired"+params);
    }
  }
});
