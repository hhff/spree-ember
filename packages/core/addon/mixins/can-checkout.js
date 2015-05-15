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
      _this._afterCheckoutsSave();
    });
  },

  /**
    A method for automatically removing the `_useCheckoutsFlag` and cleaning up 
    any hanging payment objects after a `saveToCheckouts` call.

    @method _afterCheckoutsSave
    @private
  */
  _afterCheckoutsSave: function() {
    this.set('_useCheckoutsEndpoint', false);
    
    // This is a hack because Ember Data doesn't coalesce the new record when the
    // server returns a saved payment.  There's probably something I'm missing
    // here, but basically this checks if there's a payment with an ID, and if
    // so invokes "deleteRecord" on the null ID payment objects.

    // I would be super happy if someone decided to fix this so that the initial
    // payment object gets cleaned up when the server responds in a more "Ember
    // Data-ey" way.
    var payments = this.get('payments');
    var savedPaymentExists = !Ember.isEmpty(payments.mapBy('id').without(null));
    if (savedPaymentExists) {
      payments.filterBy('id', null).invoke('deleteRecord');
    }
  }
});
