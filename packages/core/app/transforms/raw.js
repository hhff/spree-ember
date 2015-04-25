import DS from 'ember-data';
/**
  A simple `DS` transform for accepting raw server output and leaving as is.  Currently
  the only use case is for accepting Spree's Order Checkout Steps as a raw array of
  strings.

  @class RawTransform
  @namespace SpreeEmber
  @module spree-ember-core/transforms/array
  @extends DS.Transform
*/
export default DS.Transform.extend({

  /**
    Return raw output.
    @method deserialize
  */
  deserialize: function(serialized) {
    return serialized;
  },

  /**
    Don't serialize raw input.
    @method serialize
  */
  serialize: function(deserialized) {
    return deserialized;
  }
});