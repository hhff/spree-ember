import DS from 'ember-data';

export default DS.Model.extend({
  alt:        DS.attr('string'),
  miniUrl:    DS.attr('string'),
  smallUrl:   DS.attr('string'),
  productUrl: DS.attr('string'),
  largeUrl:   DS.attr('string')
});