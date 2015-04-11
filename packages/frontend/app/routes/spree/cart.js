import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    deleteLineItem: function(lineItem) {
      lineItem.destroyRecord();
      return false;
    }
  }
});
