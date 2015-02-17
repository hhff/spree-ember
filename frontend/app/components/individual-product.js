import Ember from 'ember';
import CyclesClasses from 'ember-cli-spree-frontend/mixins/cycles-classes'

export default Ember.Component.extend(CyclesClasses, {
  tagName: 'li',
  classNames: ['columns', 'three'],
  classNameBindings: ['cycle'],
  classNameCycle: ['alpha', 'secondary', '', 'omega']
});