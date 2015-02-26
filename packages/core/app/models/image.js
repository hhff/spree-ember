import DS from 'ember-data';

export default DS.Model.extend({
  alt:                   DS.attr('string'),
  miniUrl:               DS.attr('string'),
  smallUrl:              DS.attr('string'),
  productUrl:            DS.attr('string'),
  largeUrl:              DS.attr('string'),
  position:              DS.attr('number'),
  attachmentContentType: DS.attr('string'),
  attachmentFileName:    DS.attr('string'),
  type:                  DS.attr('string'),
  attachmentUpdatedAt:   DS.attr('string'),
  attachmentWidth:       DS.attr('string'),
  attachmentHeight:      DS.attr('string'),
  // TODO - Viewable Polymorphism
  viewableType:          DS.attr('string'),
  viewableId:            DS.attr('number')
});