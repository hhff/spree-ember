import Ember from 'ember';
import CyclesClasses from 'ember-cli-spree-frontend/mixins/cycles-classes'

export default Ember.Component.extend(CyclesClasses, {
  tagName: 'tr',
  classNames: ['line-item'],
  classNameBindings: ['cycle'],
  classNameCycle: ['', 'alt']
});
