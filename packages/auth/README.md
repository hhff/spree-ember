# Spree Ember Auth

The Spree Ember Auth is a wrapper on [Ember Simple Auth](https://github.com/simplabs/ember-cli-simple-auth),
that provides a custom Spree `Authorizer` and `Authenticator` that work out of 
the box with the [Spree](http://github.com/spree/spree) rails engine via 
[Spree AMS](http://github.com/hhff/spree_ams).

It uses:
* [Spree Ember Core](http://www.spree-ember.com/core/index.html)
* [Ember Simple Auth](https://github.com/simplabs/ember-cli-simple-auth)

## Installation

```bash
ember install spree-ember-auth
```

For full Spree Ember documentation, visit [http://www.spree-ember.com/](http://www.spree-ember.com).

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).

### Creating and Authenticating Users

The Spree Store and User model is provided by `spree-ember-core`.

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

