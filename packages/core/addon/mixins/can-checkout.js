import Ember from 'ember';
import DS from 'ember-data';

/**
  This mixin is used with the order model, to provide it with a
  `saveToCheckouts` method, for using the Spree Checkouts API Endpoint.

  @class CanCheckout
  @namespace Mixin
  @extends Ember.Mixin
*/
export default Ember.Mixin.create({
  /**
    A flag for telling `save` internals downstream to use Spree's Checkouts API
    endpoint, rather than the `orders` endpoint.

    @property _useCheckoutsEndpoint
    @private
    @type DS.attr('boolean')
    @default false
  */
  _useCheckoutsEndpoint: DS.attr('boolean'),
  /**
    Simply wraps the `DS.Model#save` method to set the boolean flag 
    `_useCheckoutsEndpoint` for the duration of that promise.  Downstream
    Serializers and Adapters can call `snapshot.attr('_useCheckoutsEndpoint')` 
    and react accordingly.

    @method saveToCheckouts
    @return {Ember.RSVP.Promise} Returns the promise from `save`.
  */
  saveToCheckouts: function() {
    this.set('_useCheckoutsEndpoint', true);
    var _this = this;
    return this.save().finally(function() {
      _this.set('_useCheckoutsEndpoint', false);
    });
  }
});
