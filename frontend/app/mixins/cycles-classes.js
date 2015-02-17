import Ember from 'ember';

export default Ember.Mixin.create({
  cycle: function() {
    var index = this.get('cycleIndex') % this.get('classNameCycle.length');
    return this.get('classNameCycle')[index];
  }.property('cycleIndex')
});
