import DS from 'ember-data';

export default DS.Model.extend({
  paymentMethod: DS.belongsTo('paymentMethod'),
  source: DS.belongsTo('source')
});
