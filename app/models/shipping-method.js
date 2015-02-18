import DS from 'ember-data';

export default DS.Model.extend({
  // Attributes
  name: DS.attr('string'),

  // Relationships
  zones:              DS.hasMany('zone'),
  shippingCategories: DS.hasMany('shippingCategory')
});