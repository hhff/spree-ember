import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  permalink: DS.attr('string'),
  prettyName: DS.attr('string'),
  taxons: DS.hasMany('taxon'),

  root: Ember.computed('taxons', function() {
    return this.get('taxons').findBy('parentId', undefined);
  }),

  taxonsExcludingRoot: Ember.computed('taxons', function() {
    return this.get('taxons').filterBy('parentId');
  })
});
