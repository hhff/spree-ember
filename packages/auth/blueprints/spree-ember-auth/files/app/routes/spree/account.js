import Ember from 'ember';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';
import UserRouteActions from 'spree-ember-auth/mixins/user-route-actions';

export default Ember.Route.extend(AuthenticatedRouteMixin, UserRouteActions);
