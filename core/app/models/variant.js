import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  sku: DS.attr('string'),
  price: DS.attr('number'),
  weight: DS.attr('number'),
  height: DS.attr('number'),
  width: DS.attr('number'),
  depth: DS.attr('number'),
  isMaster: DS.attr('boolean'),
  costPrice: DS.attr('number'),
  slug: DS.attr('string'),
  description: DS.attr('string'),
  trackInventory: DS.attr('boolean'),
  displayPrice: DS.attr('string'),
  optionsText: DS.attr('string'),
  images: DS.hasMany('image'),
  canSupply: DS.attr('boolean')
});