export default function(router, mountPoint) {

  var mountPath = "/";

  if (mountPoint) {
    if (!(typeof mountPoint === "string")) {
      throw new Error("SpreeRouter Mount Point must be a string");
    }
    if (mountPoint.charAt(0) !== "/") {
      throw new Error('SpreeRouter Mount Point must begin with "/"');
    }
    mountPath = mountPoint;
  }

  router.resource('products', { path: mountPath+'/products' },function() {
    this.route('index', { path: '/' });
    this.route('show', { path: '/:slug' });
  });

  router.resource('checkout', { path: mountPath+'/checkout' },function() {
    this.route('redirect', { path: '/' });
    this.route('registration');
    this.route('cart');
    this.route('address');
    this.route('delivery');
    this.route('payment');
    this.route('confirm');
    this.route('complete');
  });

  router.route('cart', { path: mountPath+'/cart' });

}