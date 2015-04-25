import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  prettyName: DS.attr('string'),
  permalink: DS.attr('string'),
  parentId: DS.attr('string'),
  taxonomy: DS.belongsTo('taxonomy')
});
