import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  permalink: DS.attr('string'),
  prettyName: DS.attr('string'),
  taxons: DS.hasMany('taxon'),

  root: function() {
    return this.get('taxons').findBy('parentId', undefined);
  }.property('taxons'),

  taxonsExcludingRoot: function() {
    return this.get('taxons').filterBy('parentId');
  }.property('taxons')
});
