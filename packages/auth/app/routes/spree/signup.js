import Ember from 'ember';
import UnauthenticatedRouteMixin from 'simple-auth/mixins/unauthenticated-route-mixin';
import UserRouteActions from 'spree-ember-auth/mixins/user-route-actions';

export default Ember.Route.extend(UnauthenticatedRouteMixin, UserRouteActions);
