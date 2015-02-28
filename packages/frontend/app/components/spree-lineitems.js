import Ember from 'ember';

export default Ember.Component.extend({
  action: 'deleteLineItem',

  actions: {
    deleteLineItem: function(lineItem) {
      this.sendAction('action', lineItem);
      return false;
    }
  }
});
