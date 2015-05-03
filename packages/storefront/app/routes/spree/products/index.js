import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    return Ember.RSVP.hash({
      products: this.spree.store.find('product'),
      taxonomies: this.spree.store.find('taxonomy')
    });
  }
});
