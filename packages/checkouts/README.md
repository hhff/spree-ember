# Spree Ember Checkouts

The Spree Ember Checkouts uses the [Javascript State Machine](https://github.com/jakesgordon/javascript-state-machine)
to add Spree Current Order management and State Machine transitions to the Spree
service.  By providing a standard interface to trigger Spree order transitions,
an API driven checkout process is greatly simplified. 

This interface is designed to work out the box with the [Spree](http://github.com/spree/spree) 
rails engine via [Spree AMS](http://github.com/hhff/spree_ams).

It uses:
* [Spree Ember Core](http://www.spree-ember.com/core/index.html)
* [Javascript State Machine](https://github.com/jakesgordon/javascript-state-machine)

## Installation

```bash
ember install spree-ember-checkouts
```

For full Spree Ember documentation, visit [http://www.spree-ember.com/](http://www.spree-ember.com).

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).

## Current Order Management & Transitions

```javascript
this.spree.get('currentOrder.state');
// "cart"

this.spree.transitionCheckoutState().then(
  function(currentOrder) {
    currentOrder.get('state');
    // "delivery"
  }
);

this.spree.transitionCheckoutState("complete").catch(function(spreeError){
  alert("Could not transition");
  return spreeError;
});
```

### Customizing the Frontend State Machine

The `spree-ember-checkouts` addon provides a single file where it defines the
checkout state machine events and callbacks.

Copy it into your host application:

```bash
ember generate spree-ember-checkouts-flow
```

This will install a file at `your-app/app/spree/checkouts-flow.js`

Modify this file to work with any customizations you've made to your Spree
backend.
