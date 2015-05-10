export default function(router, ENV) {

  var mountPath   = ENV["spree"]["mount"];
  var signinPath  = ENV["spree"]["signinPath"];
  var signupPath  = ENV["spree"]["signupPath"];
  var accountPath = ENV["spree"]["accountPath"];
  
  router.resource('spree', { path: mountPath }, function() {
    this.route('signin', { path: signinPath });
    this.route('signup', { path: signupPath });
    this.route('account', { path: accountPath });
  });
}

