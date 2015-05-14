# Customization

The Spree Ember frontend has been built carefully to provide stability, but not 
limit the developer.

### Defaults
***

All Spree Ember configuration is done through the Ember CLI environment.  Here's
the defaults for the `spree-ember-storefronts` package:

```javascript
"spree": {
  apiHost: "http://localhost:3000",
  namespace: "api/ams",
  mount: "/",
  productsPath: "products",
  cartPath: "cart",
  checkoutPath: "checkout",
  ordersPath: "orders",
  taxonsPath: "t"
}
```

### Zurb Foundation
***

We chose Zurb Foundation because it allowed us to build a fully responsive 
frontend without writing a line of custom CSS.

It's super easy to disable.  Simply edit your application's
`Brocfile.js`:

```javascript
var app = new EmberApp({
  'spree-ember-storefront': {
    disableNormalize: true,
    disableFoundation: true
  }
});
```

**Note:** This is also useful if you'd like to use a more configurable approach to
using Zurb, such as [ember-cli-foundation-sass](https://github.com/artificialio/ember-cli-foundation-sass).

# Generators

Generators allow you to copy files from an Ember Addon into your Ember host 
application.  This way they will override the Addon versions of themselves, and
allow the developer to deeply customize the way an Addon behaves.

### Templates
***

When you installed `spree-ember-storefront`, every frontend template file from
the addon was copied to your host application.  If you need to re-install them,
you can re-run the default generator:

```bash
ember generate spree-ember-storefront
```

**Note:** This will also attempt to re-install `ember-cli-foundation-sass`, and
overwrite any template changes you've made since the initial installation.

### Components
***

Sometimes, you'll want to deeply customize the way a component behaves.  You can
copy the `spree-ember-storefront` component javascript files to your host
application with this generator: 

```bash
ember generate spree-ember-storefront-components
```

You can now extend the default components, or overwrite them completely.

### Routes
***

If you need to add actions to routes, or specify custom route behaviour, you'll
want to copy the `spree-ember-storefront` route javascript files to your host
application.  Simply run this generator:

```bash
ember generate spree-ember-storefront-routes
```

You'll now have the routes availble to your application, ready for
customization.

### Customizing the Checkout Flow
***

The `spree-ember-storefront` addon uses `spree-ember-checkouts` as a dependency.
It provides a stateful checkout abstraction as a service to allow the developer
to build a single page checkout in a reactive style of programming.

Spree allows the developer to customize the backend Order State Machine.  Spree
Ember provides the same utility through the [Ember FSM](https://github.com/heycarsten/ember-fsm)
library.

#### **For more information, please see the [spree-ember-checkouts API Documentation.](http://www.spree-ember.com/checkouts/index.html)**

### Adding User Accounts and Management 
***

Spree also provides User models.  If you'd like to add user accounts and user
management to your Spree Ember application, you can do so with a single line
install:

```bash
ember install spree-ember-auth
```

Like `spree-ember-storefront`, you'll want to add the `spree-ember-auth` router
to your application.

In `router.js`:

```javascript
import Ember from 'ember';
import config from './config/environment';
import spreeRouter from 'spree-ember-storefront/router';
import spreeAuthRouter from 'spree-ember-auth/router';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  spreeRouter(this, config);
  spreeAuthRouter(this, config);
});

export default Router;
```

The `spree-ember-auth` package is a wrapper for the 
[Ember Simple Auth](https://github.com/simplabs/ember-simple-auth) package, and 
provides some default customization variables to the `spree` environment object.

#### **For more information, please see the [spree-ember-auth API Documentation.](http://www.spree-ember.com/auth/index.html)**
