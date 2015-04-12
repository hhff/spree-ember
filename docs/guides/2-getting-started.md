# Getting Started

**Note:** You won't see any Spree data until you 
[Configure Spree](http://spree-ember.com/3-configuring-spree.html) - you'll do 
that next.

### Ember CLI
***

First - you'll need the Ember CLI.  Head over to their 
[Getting Started with Ember CLI](http://www.ember-cli.com/#getting-started) for 
instructions.

Once installed, you'll want to spin up a new Ember application.

```bash
ember new my-spree-frontend
cd my-spree-frontend
ember server
```

Now open up your browser, and navigate to `localhost:4200`, and you you should 
see the default Ember welcome page!

### Installing Spree Ember
***

Spree Ember is broken up into seperate Ember CLI Addons, but unless you know 
what you're doing, you're best off installing the Frontend package.

```bash
ember install spree-ember
```

Now, you'll need to tell Ember where to put the standard Spree routes.

In `router.js`:

```javascript
import Ember from 'ember';
import config from './config/environment';

// This line imports the Spree Router.
import spreeRouter from 'ember-cli-spree-frontend/router';

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

Now start up the `ember server`, and you should now see the Spree Ember welcome 
page!

#### **Next you'll want to [Configure Spree](http://spree-ember.com/3-configuring-spree.html).**
