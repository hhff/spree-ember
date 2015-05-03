export default function(router, ENV) {

  var mountPath      = ENV["spree"]["mount"];
  var cartPath       = ENV["spree"]["cartPath"];
  var checkoutPath   = ENV["spree"]["checkoutPath"];
  var productsPath   = ENV["spree"]["productsPath"];
  var ordersPath     = ENV["spree"]["ordersPath"];
  var taxonsPath     = ENV["spree"]["taxonsPath"];
  
  router.resource('spree', { path: mountPath }, function() {
    router.route('spree.cart', { path: mountPath + '/' + cartPath });
    router.route('spree.checkout', { path: mountPath + '/' + checkoutPath });

    router.route('spree.products', { path: mountPath + '/' + productsPath },function() {
      this.route('index', { path: '/' });
      this.route('show', { path: '/:slug' });
    });
    
    router.route('spree.taxons', { path: mountPath + '/' + taxonsPath },function() {
      this.route('index', { path: '/*taxon_id' });
    });

    router.route('spree.orders', { path: mountPath + '/' + ordersPath },function() {
      this.route('index', { path: '/' });
      this.route('show', { path: '/:id' });
    });
  });
}
