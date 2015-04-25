# Users

Often online stores can make do with out needing to track users, relying only on
order IDs and tokens, however in the case that your online store does require
user accounts and associated behaviour, you can simply add this addon to you
application:

```bash
ember install spree-ember-auth
```

This will install Ember Simple Auth into your Spree Ember application, and add
some useful files to your application.

### Setup

Now you'll need to tell your router about the new Spree Auth routes:

```javascript
import Ember from 'ember';
import config from './config/environment';

// This line imports the Spree Router.
import spreeRouter from 'spree-ember-storefront/router';

// This line import the Spree Auth Router.
import spreeAuthRouter from 'spree-ember-auth/router';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  spreeRouter(this, {
    mountPath:    '/spree',
    cartPath:     'cart',
    productsPath: 'products',
    checkoutPath: 'checkout'
  });

  // You'll get an error if your Mount Path is different to your Spree Router,
  // these need to match.
  spreeAuthRouter(this, {
    mountPath:   '/spree',
    signinPath:  'login',
    signupPath:  'new',
    accountPath: 'profile'
  });
});

export default Router;
```

### Creating & Authenticating Users
***

The `spree-ember-auth` package adds an [Ember Simple Auth](https://github.com/simplabs/ember-cli-simple-auth)
Authenticator and Authorizer to the host application's registry.  It then sets 
these up to work nicely with local storage.  Finally, it adds some useful 
methods, routes and templates for managing Spree users and their sessions on the 
frontend.

```javascript
// A contrived example.

var email    = "me@hughfrancis.me";
var password = "SpreeEmber123";

var newCustomer = this.spree.store.createRecord("user", {
  email:    email, 
  password: password,
  passwordConfirmation: password
});

var _this = this;

newCustomer.save().then(
  function(newCustomer) {
    // You probably don't want to nest callbacks...
    _this.session.authenticate(email, password).then(
      function() {
        // Now, all requests will contain an Authorization Header for Spree.
        alert("Session Authenticated and Persisted to Local Storage!");
      }
    )
  }
);

```

#### **Ready to deploy? Checkout the [deployment section](./8-deployment.html).**
