# Spree Ember Storefront

The Spree Ember Storefront is a collection of routes, templates and components
that work out of the box with the [Spree](http://github.com/spree/spree) rails 
engine via [Spree AMS](http://github.com/hhff/spree_ams).

It uses:
* [Spree Ember Core](http://www.spree-ember.com/core/index.html)
* [Spree Ember Checkouts](http://www.spree-ember/checkouts/index.html)
* [Ember CLI Foundation Sass](https://github.com/artificialio/ember-cli-foundation-sass)

## Installation

```bash
ember install spree-ember-storefront
```

Now, you'll need to tell Ember where to put the standard Spree routes.

In `router.js`:

```javascript
import Ember from 'ember';
import config from './config/environment';

// This line imports the Spree Router.
import spreeRouter from 'spree-ember-storefront/router';

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
});

export default Router;
```

For full Spree Ember documentation, visit [http://www.spree-ember.com/](http://www.spree-ember.com).

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).
