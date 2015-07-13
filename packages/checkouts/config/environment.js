'use strict';

module.exports = function(/* environment, appConfig */) {
  var ENV = {};

    ENV['spree'] = {
      apiHost: 'http://testing.spree-ember.com',
      namespace: "api/ams",
      mount: "/",
      productsPath: "products",
      cartPath: "cart",
      checkoutPath: "checkout",
      ordersPath: "orders",
      taxonsPath: "t"
    };

  return ENV;
};
