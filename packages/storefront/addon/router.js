export default function(router, options) {

  options = options || {};

  var mountPath    = options['mountPath']    || '/spree';
  var cartPath     = options['cartPath']     || 'cart';
  var productsPath = options['productsPath'] || 'products';
  var taxonomiesPath = options['taxonomiesPath'] || 'taxonomies';
  var taxonsPath = options['taxonsPath'] || 'taxons';
  var checkoutPath = options['checkoutPath'] || 'checkout';

  router.resource('spree', { path: mountPath }, function() {
    router.route('spree.cart', { path: mountPath + '/' + cartPath });

    router.resource('spree.products', { path: mountPath + '/' + productsPath },function() {
      this.route('index', { path: '/' });
      this.route('show', { path: '/:slug' });
    });

    router.resource('spree.taxonomies', { path: mountPath + '/' + taxonomiesPath },function() {
      this.route('index', { path: '/' });
    });

    router.resource('spree.taxons', { path: mountPath + '/' + taxonsPath },function() {
      this.route('index', { path: '/*taxon_id' });
    });

    router.resource('spree.checkout', { path: mountPath + '/' + checkoutPath },function() {
      this.route('redirect', { path: '/' });
      this.route('registration');
      this.route('cart');
      this.route('address');
      this.route('delivery');
      this.route('payment');
      this.route('confirm');
      this.route('complete');
    });
  });

}
