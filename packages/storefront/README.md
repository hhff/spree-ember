# Spree Ember Storefront

[![Build Status](https://travis-ci.org/hhff/spree-ember.svg?branch=master)](https://travis-ci.org/hhff/spree-ember)
[![Join the chat at https://gitter.im/hhff/spree-ember](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/hhff/spree-ember?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![Code Climate](https://codeclimate.com/github/hhff/spree-ember.png)](https://codeclimate.com/github/hhff/spree-ember)
[![Inline docs](http://inch-ci.org/github/hhff/spree-ember.png)](http://inch-ci.org/github/hhff/spree-ember)

The Spree Ember Storefront is a collection of routes, templates and components
that work out of the box with the [Spree](http://github.com/spree/spree) rails 
engine via [Spree AMS](http://github.com/hhff/spree_ams).

It uses:
* [Spree Ember Core](http://www.spree-ember.com/core/index.html)
* [Spree Ember Checkouts](http://www.spree-ember/checkouts/index.html)

## Installation

```bash
ember install spree-ember-storefront
```

This will install all of the Storefront templates into your host application.

Now, you'll need to tell Ember's router where to put the standard Spree routes.

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
  spreeRouter(this, config);
});

export default Router;
```

For full Spree Ember documentation, visit [http://www.spree-ember.com/](http://www.spree-ember.com).

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).

## Disable Normalize.css & Zurb Foundation

Spree Ember Storefront includes Normalize & Zurb Foundation into your CSS tree.
If you'd like to disable them, you can optionally do so in your application's
`Brocfile.js`.

```javascript
var app = new EmberApp({
  'spree-ember-storefront': {
    disableNormalize: true,
    disableFoundation: true
  }
});
```

## Testing 

```bash
npm install
bower install
# current Ember version
ember test
# all supported Ember versions
ember test
```

## Contributing 

In the addon folder
```bash
npm link
```

In your project folder
```bash
npm link spree-ember-storefront
ember generate spree-ember-storefront
```
