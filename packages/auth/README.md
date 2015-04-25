# Spree Ember Auth

[![Build Status](https://travis-ci.org/hhff/spree-ember.svg?branch=master)](https://travis-ci.org/hhff/spree-ember)
[![Join the chat at https://gitter.im/hhff/spree-ember](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/hhff/spree-ember?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

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

This will run the `spree-ember-auth` generator, which does a few key things:

* Adds Ember CLI Simple Auth to your host application
* Installs user related routes at `app/routes/spree/*`
* Installs user related route templates at `app/templates/spree/*`
* Attempts to install an application route file at `app/routes/application.js`

**Important:** If you opted to not override your application route, or you're
using an application setup that will ignore the generated `application.js` such
as the Pod structure, you'll need to manually import the Ember Simple Auth
application route mixin, like so:

```js
import ApplicationRouteMixin from 'simple-auth/mixins/application-route-mixin';

export default Ember.Route.extend(ApplicationRouteMixin);
```

It's recommended that you study the [Ember Simple Auth Documentation](http://ember-simple-auth.com/ember-simple-auth-api-docs.html).

For full Spree Ember documentation, visit [http://www.spree-ember.com/](http://www.spree-ember.com).

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).

### Setup

Now you'll need to tell your router about the new Spree Auth routes:

```javascript
import Ember from 'ember';
import config from './config/environment';

import spreeRouter from 'spree-ember-storefront/router';
import spreeAuthRouter from 'spree-ember-auth/router';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  spreeRouter(this);
  spreeAuthRouter(this);
});

export default Router;
```

You can also have finer control over the route names in the same way as
`spree-ember-storefront`:

```javascript
import Ember from 'ember';
import config from './config/environment';

import spreeRouter from 'spree-ember-storefront/router';
import spreeAuthRouter from 'spree-ember-auth/router';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  spreeRouter(this, {
    mountPath:    '/spree',
    cartPath:     'basket',
    productsPath: 'items',
    checkoutPath: 'pay'
  });

  spreeAuthRouter(this, {
    mountPath:   '/spree',
    signinPath:  'login',
    signupPath:  'new-user',
    accountPath: 'profile'
  });
});

export default Router;
```

**Please Note**: Your `mountPath` must match your `spree-ember-storefront`
`mountPath`.

### Overriding the Signin / Signup Component

You can override the appearance and behaviour of the `{{spree-auth}}` component
by running the generator:

```bash
ember g spree-ember-auth-component
```

This will install a template file at `app/templates/components/spree-auth` and a
component file at `app/components/spree-auth`.
