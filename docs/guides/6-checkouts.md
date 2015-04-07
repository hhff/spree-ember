# Checkouts

Often, when building a Spree site, you'll need to customize the default Checkout
flow.

The `spree-ember-frontend` Ember Addon has a dependancy on
`spree-ember-checkouts`, and another Addon that will augment the injected Spree
service to handle a `currentOrder`, and manage it's state with a Fintite State 
Machine.

Spree's checkout flow uses the [State
Machine](https://rubygems.org/gems/state_machine) Gem on the backend.  To
properly handle API driven state transitions in Spree Ember, we use the
[Javascipt Finite State
Machine](https://github.com/jakesgordon/javascript-state-machine).

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
***

The `spree-ember-checkouts` addon provides a single file where it defines the
checkout state machine events and callbacks.

Copy it into your host application:

```bash
ember generate spree-ember-checkouts-flow
```

This will install a file at `your-app/app/spree/checkout-states.js`

Modify this file to work with any customizations you've made to your Spree
backend.

#### **Need to manage Spree Users on your frontend?  Check out the 
[section on managing users](http://spree-ember.com/7-users.html).**
