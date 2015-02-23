import Ember from 'ember';

export default Ember.Mixin.create({

  updateShipments: function(order) {
    var _this = this;

    // TODO Spree should have its own adapter & store
    var originalState = order.get('state');
    var adapter       = this.get('container').lookup('adapter:application');
    var updateURL     = adapter.buildURL('checkout', order.get('id'))+".json"
    var nextURL       = adapter.buildURL('checkout', order.get('id'))+"/next.json"

    var orderData = {
      shipments_attributes: {}
    };

    // Setup Shipments Data for Spree
    order.get('shipments').forEach(function(shipment, index) {
      var shipmentId             = shipment.get('id');
      var selectedShippingRateId = shipment.get('selectedShippingRate.id');
      orderData.shipments_attributes[index] = {
        selected_shipping_rate_id: selectedShippingRateId,
        id: shipmentId
      }
    });

    return adapter.ajax(nextURL, 'PUT', {data: {order: orderData}}).then(
      function(orderPayload) {
        _this.store.pushPayload(orderPayload);
        var newState = orderPayload.order.state;
        if (newState !== originalState) {
          _this.trigger('orderStateDidChange', newState);
        }
        return _this.store.find('order', orderPayload.order.id);
      },
      function(error) {
        _this.trigger('serverError', error);
        return error;
      }
    )
  },

  savePayments: function(order) {
    var _this = this;

    // TODO Spree should have its own adapter & store
    var originalState = order.get('state');
    var adapter       = this.get('container').lookup('adapter:application');
    var updateURL     = adapter.buildURL('checkout', order.get('id'))+".json"
    var nextURL       = adapter.buildURL('checkout', order.get('id'))+"/next.json"

    var orderData = {
      payments_attributes: [],
    };

    var payment_source = {};

    // These should realistically be serialized...
    order.get('payments').forEach(function(payment, index) {
      var paymentMethodId = payment.get('paymentMethod.id');
      var source          = payment.get('source');

      orderData.payments_attributes.push({payment_method_id: paymentMethodId});

      payment_source[paymentMethodId] = {
        number:             source.get('number').toString(),
        month:              source.get('month'),
        year:               source.get('year'),
        verification_value: source.get('verificationValue'),
        name:               source.get('name')
      }
    });

    return adapter.ajax(updateURL, 'PUT', {data: {order: orderData, payment_source: payment_source}}).then(
      function(orderPayload) {
        _this.store.pushPayload(orderPayload);
        var newState = orderPayload.order.state;
        if (newState !== originalState) {
          _this.trigger('orderStateDidChange', newState);
        }
        return _this.store.find('order', orderPayload.order.id);
      },
      function(error) {
        _this.trigger('serverError', error);
        return error;
      }
    )
  },

  confirmOrder: function(order) {
    var _this = this;

    // TODO Spree should have its own adapter & store
    var originalState = order.get('state');
    var adapter       = this.get('container').lookup('adapter:application');
    var updateURL     = adapter.buildURL('checkout', order.get('id'))+".json"
    var nextURL       = adapter.buildURL('checkout', order.get('id'))+"/next.json"

    return adapter.ajax(nextURL, 'PUT').then(
      function(orderPayload) {
        _this.store.pushPayload(orderPayload);
        var newState = orderPayload.order.state;
        if (newState !== originalState) {
          _this.trigger('orderStateDidChange', newState);
        }
        return _this.store.find('order', orderPayload.order.id);
      },
      function(error) {
        _this.trigger('serverError', error);
        return error;
      }
    )
  }
});
