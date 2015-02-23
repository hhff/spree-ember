import DS from 'ember-data';

export default DS.Model.extend({
  name:         DS.attr('string'),
  description:  DS.attr('string'),
  methodType:   DS.attr('string'),

  // Computed
  isGateway: Ember.computed('methodType', function() {
    var methodType = this.get('methodType');
    return methodType === "gateway" || "stripe";
  })
});
