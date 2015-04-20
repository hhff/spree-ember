import SpreeSerializer from 'spree-ember-core/serializers/spree';
/**
  The Order Serializer converts the Order model into a JSON payload as dictated 
  by Spree's "Checkouts" endpoint.  The payload is dependant on the state of the 
  order.

  @class OrderSerializer
  @extends SpreeSerializer
*/
export default SpreeSerializer.extend({
  /**
    Serializes the Order into a format the Spree Checkouts endpoint expects.

    @method serialize
    @param {snapshot} snapshot A snapshot of the order model for serialization.
  */
  serialize: function(snapshot) {
    var order      = snapshot.record;
    var orderState = order.get('state');

    var data = {
      order: this._super.apply(this, arguments),
      state: orderState
    };

    switch(orderState) {
      case "address":
        var billAddress = order.get('billAddress');
        if (billAddress) {
          data.order['bill_address_attributes'] = billAddress.serialize();
        }
        var shipAddress = order.get('shipAddress');
        if (shipAddress) {
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
        var payment = order.get('payments.firstObject');
        if (payment && payment.get('source.isDirty')) {
          data['payment_source'] = {};
          data.order['payments_attributes'] = [{payment_method_id: payment.get('paymentMethod.id')}];
          data.payment_source[payment.get('paymentMethod.id')] = payment.get('source').serialize();
        }
        break;
    }
    return data;
  }
});
