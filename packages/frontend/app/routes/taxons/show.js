import Ember from 'ember';
import SpreeRouteSetup from 'ember-cli-spree-frontend/mixins/route-setup';

export default Ember.Route.extend(SpreeRouteSetup, {
  model: function(params) {
    var taxonomies = this.modelFor('application').taxonomies;

    var taxonomy = taxonomies.findBy('permalink', params.permalink)
    debugger
    return taxonomies.findBy('permalink', params.permalink);
  },

  setupController: function(model) {
    if (this.get('spree.frontend.taxonBreadcrumbs')) {
      this.get('spree.frontend.taxonBreadcrumbs').pushObject(model);
    } else {
      this.set('spree.frontend.taxonBreadcrumbs', Ember.A([model]));
    }
    this._super.apply(this, arguments);
  }
});
