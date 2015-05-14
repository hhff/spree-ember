import Ember from 'ember';
import SpreeSerializer from 'spree-ember-core/serializers/spree';
/**
  The Order Serializer converts the Order model into a JSON payload as dictated 
  by Spree's "Checkouts" endpoint.  The payload is dependant on the state of the 
  order.

  @class Order
  @namespace Serializer
  @extends SpreeSerializer
*/
export default SpreeSerializer.extend({
  /**
    By default, Ember's Active Model Serializer will merge the JSON payload
    returned by the `serialize` call under the model's name.  The Spree
    Checkouts endpoint expects objects as siblings in the payload, so when we're
    saving the checkouts via `DS.Order#saveToCheckouts()` we override this 
    behaviour.

    @method serializeIntoHash
    @param {Object} data The payload for the request.
    @param {subclass of DS.Model} type The model factory.
    @param {Ember.Object} snapshot The record's snapshot.
    @param {Object} options Options for the request.
  */
  serializeIntoHash: function(data, type, snapshot, options) {
    if (snapshot.attr('_useCheckoutsEndpoint')) {
      Ember.merge(data, this.serialize(snapshot, options));
    } else {
      this._super.apply(this, arguments);
    }
  },
  /**
    Serializes the Order into a format the Spree Checkouts endpoint expects.

    @method serialize
    @param {snapshot} snapshot A snapshot of the order model for serialization.
  */
  serialize: function(snapshot) {
    var json = this._super.apply(this, arguments);
    if (snapshot.attr('_useCheckoutsEndpoint')) {
      json = this._serializeForCheckouts(snapshot, json);
    }
    return json;
  },

  /**
    A reference to the Stateful Checkouts service.

    @property checkouts
    @type Ember.Service
  */
  checkouts: Ember.inject.service('checkouts'),

  /**
    Serializes the Order into a format the Spree Checkouts endpoint expects, 
    dependant on the state of Checkouts service.

    @method _serializeForCheckouts
    @private
    @param {Ember.Object} snapshot A snapshot of the order model for serialization.
    @param {Object} orderJSON The regular JSON for the Order.
  */
  _serializeForCheckouts: function(snapshot, orderJSON) {
    var order         = snapshot.record;
    var checkoutState = this.get('checkouts.currentState');

    var data = {
      order: orderJSON,
      state: checkoutState
    };

    switch(checkoutState) {
      case "address":
        var billAddress = order.get('billAddress');
        if (billAddress && billAddress.get('isDirty')) {
          data.order['bill_address_attributes'] = billAddress.serialize();
        }
        var shipAddress = order.get('shipAddress');
        if (shipAddress && shipAddress.get('isDirty')) {
          data.order['ship_address_attributes'] = shipAddress.serialize();
        }
        break;
      case "delivery":
        var shipments = order.get('shipments');
        if (shipments) {
          data.order['shipments_attributes'] = {};
          shipments.forEach(function(shipment, index) {
            data.order.shipments_attributes[index] = shipment.serialize();
          });
        }
        break;
      case "payment":
        var payment = order.get('activePayment');
        if (payment && (payment.get('isDirty') || payment.get('source.isDirty'))) {
          data['payment_source'] = {};
          data.order['payments_attributes'] = [{payment_method_id: payment.get('paymentMethod.id')}];
          data.payment_source[payment.get('paymentMethod.id')] = payment.get('source').serialize();
        }
        break;
    }
    return data;
  },

  /**
    Extracts the errors from an Invalid response from the Server.  Overrides the
    default method to include a Top Level error from the payload as `base` in the
    `DS.Errors` collection.

    @method extractErrors
    @param {subclass of DS.Store} store The ember store used for this request.
    @param {subclass of DS.Model} type The Order Factory.
    @param {Object} payload The returned JSON Payload.
    @param {Integer} id The order's ID.
  */
  extractErrors: function(store, type, payload) {
    var base = payload.error;
    payload  = this._super.apply(this, arguments);

    if (base) {
      payload['base'] = payload['base'] || [];
      payload['base'].push(base);
    }

    return payload;
  }
});
