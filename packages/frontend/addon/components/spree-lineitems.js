import Ember from 'ember';
import layout from '../templates/components/spree-lineitems';

export default Ember.Component.extend({
  layout: layout,
  action: 'deleteLineItem',

  actions: {
    deleteLineItem: function(lineItem) {
      this.sendAction('action', lineItem);
      return false;
    }
  }
});
