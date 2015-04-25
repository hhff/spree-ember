# Spree Ember Checkouts

The Spree Ember Checkouts uses the [Javascript State Machine](https://github.com/jakesgordon/javascript-state-machine)
to add Spree Current Order management and State Machine transitions to the Spree
service.  By providing a standard interface to trigger Spree order transitions,
an API driven checkout process is greatly simplified. 

This interface is designed to work out the box with the [Spree](http://github.com/spree/spree) 
rails engine via [Spree AMS](http://github.com/hhff/spree_ams).

**Note:** This Package is included with `spree-ember-storefront`.  If you're
using that, there's no need to install this seperately.

It uses:
* [Spree Ember Core](http://www.spree-ember.com/core/index.html)
* [Javascript State Machine](https://github.com/jakesgordon/javascript-state-machine)

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
// null

var _this = this;
this.spree.addToCart(variantModel).then(function() {
  _this.spree.get('currentOrder.state');
  // "cart"
});
```

## Advancing an Order through the Checkout

You can transition an order through the checkout flow by using the 
`transitionCheckoutState` function.  Under the hood, it triggers state
transitions on a State Machine, to ensure the frontend state stays in sync with
Spree's Order State Machine.

```javascript
var _this = this;
this.spree.transitionCheckoutState().then(
  function(currentOrder) {
    currentOrder.get('state');
    // "delivery"
    
    _this.spree.transitionCheckoutState("complete").catch(function(spreeError){
      alert("Could not transition");
      return spreeError;
    });
  }
);
```

## Subscribing to Checkout Events

The Spree Checkouts package also supports a event bus / callback style 
architecture.  This is useful for binding events to Google Analytics, and such.

```javascript
this.spree.on('didAddToCart', function(lineItem) {
  alert(lineItem.get('variant.name') + " added to cart!");
});

this.spree.on('checkoutStateDidChange', function(currentOrder) {
  alert("Transitioned to " + currentOrder.get('state'));
});
```

## Customizing the Frontend State Machine

The `spree-ember-checkouts` addon provides a single file where it defines the
checkout state machine events and callbacks.  You'll want to modify this file if
you've modified Spree's default Checkout flow.

Copy it into your host application:

```bash
ember generate spree-ember-checkouts-flow
```

This will install a file at `your-app/app/checkouts/spree.js`

Modify this file to work with any customizations you've made to your Spree
backend.

**Note:** If you're using `spree-ember-storefront`, this blueprint won't be
found, as Ember CLI doesn't currently have official support for nested addons.
You can simply copy the file from this repo to your application manually.
