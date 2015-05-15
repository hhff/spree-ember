import DS from 'ember-data';

export default DS.Model.extend({
  state: DS.attr('string'),
  paymentMethod: DS.belongsTo('paymentMethod'),
  source: DS.belongsTo('source')
});
