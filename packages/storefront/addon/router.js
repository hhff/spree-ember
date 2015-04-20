export default function(router, options) {

  options = options || {};
  
  var mountPath    = options['mountPath']    || '/spree';
  var cartPath     = options['cartPath']     || 'cart';
  var productsPath = options['productsPath'] || 'products';
  var checkoutPath = options['checkoutPath'] || 'checkout';
  
  var checkoutRoutes = options['checkoutRoutes'] || ['address', 'delivery', 'payment', 'confirm', 'complete'];

  router.resource('spree', { path: mountPath }, function() {
    router.route('spree.cart', { path: mountPath + '/' + cartPath });
    
    router.resource('spree.products', { path: mountPath + '/' + productsPath },function() {
      this.route('index', { path: '/' });
      this.route('show', { path: '/:slug' });
    });

    router.resource('spree.checkout', { path: mountPath + '/' + checkoutPath },function() {
      var _this = this;
      checkoutRoutes.forEach(function(routeName) {
        _this.route(routeName);
      });
    });
  });

}
