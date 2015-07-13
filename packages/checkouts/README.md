# Spree Ember Checkouts

[![Build Status](https://travis-ci.org/hhff/spree-ember.svg?branch=master)](https://travis-ci.org/hhff/spree-ember)
[![Join the chat at https://gitter.im/hhff/spree-ember](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/hhff/spree-ember?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![Code Climate](https://codeclimate.com/github/hhff/spree-ember.png)](https://codeclimate.com/github/hhff/spree-ember)
[![Inline docs](http://inch-ci.org/github/hhff/spree-ember.png)](http://inch-ci.org/github/hhff/spree-ember)

Spree Ember Checkouts uses [Ember FSM]()
to define a Stateful Checkouts abstraction as a service for writing reactive
single page checkout flows.  It exclusively uses the [Spree Checkouts API]()
with an Order Serializer to transiton an order to completion, and populate the
order's `DS.Errors` attribute when server validation fails.

This addon also adds `currentOrder` session support to the central spree service.

**Note:** This Package is included with `spree-ember-storefront`.  If you're
using that, there's no need to install this seperately.

It uses:
* [Spree Ember Core](http://www.spree-ember.com/core/index.html)
* [Ember FSM](https://github.com/heycarsten/ember-fsm)

## Installation

```bash
ember install spree-ember-checkouts
```

For full Spree Ember documentation, visit [http://www.spree-ember.com/](http://www.spree-ember.com).

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).

## Order Management

The `addToCart` function will create an order if one doesn't currently exist,
and then add a variant to cart.  You can optionally pass in a quantity, too!

```javascript
this.spree.get('currentOrder');
// => null

var _this = this;
this.spree.addToCart(variantModel).then(function() {
  _this.spree.get('currentOrder.state');
  // => "cart"

  _this.spree.clearCurrentOrder();
  _this.spree.get('currentOrder');
  // => null
});
```

## Advancing an Order through the Checkout

All order state manipulation is done exclusively through the `transition` 
function.  Under the hood, it triggers state transitions on the checkouts Finite 
State Machine, to ensure the frontend state stays in sync with Spree's Order 
State Machine.

The Checkouts service is designed to allow a reactive style of programming for
the checkout flow, allowing the developer to focus on the User experience, and
trust that the internals of the State Machine will clear up and reconsolidate
user edge cases.

```javascript
var checkouts = this.spree.get('checkouts');

checkouts.transition().then(
  function() {
    checkouts.get('currentState');
    // => "delivery"
    checkouts.get('currentOrder.state');
    // => "delivery"
    
    checkouts.transition("address").finally(function() {
      checkouts.get('currentState');
      // => "address"
      checkouts.get('currentOrder.state');
      // => "delivery"
    });
  }
);
```

In the above example, the Checkouts `currentState` diverges from the
`currentOrder` state when moving backward.  This is expected behaviour - the
states will reconsolidate when the order advances forward again.

**Note:** This is an example of why it's important to use the Checkouts service
as the canoncial state to represent in the UI, and not the `currentOrder`
directly.

## Subscribing to Checkout Events

The Spree Checkouts package also supports a event bus / callback style 
architecture.  This is useful for binding events to Google Analytics, and such.

```javascript
this.spree.on('didAddToCart', function(lineItem) {
  alert(lineItem.get('variant.name') + " added to cart!");
});
```

#### **For more information, please see the [spree-ember-checkouts API Documentation.](http://www.spree-ember.com/checkouts/index.html)**

## Testing 

```bash
npm install
bower install
# current Ember version
ember test
# all supported Ember versions
npm test
```

Note, if you serve the app to open the tests URL in a browser,
don't forget to use the test environment.

```bash
ember serve --environment=test
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
