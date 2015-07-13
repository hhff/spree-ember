import Ember from 'ember';

/*
  The presence of this controller is a workaround for:
  Cannot call get with 'currentPath' on an undefined object.
  https://github.com/ember-cli/ember-cli/issues/1203
*/
export default Ember.Controller.extend({
});
