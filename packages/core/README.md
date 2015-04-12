# Spree Ember Core

Spree Ember Core is the core dependency of all other Spree Ember addons.  It
provides the `spree` service, which has a seperate `store` to the host
application.

This store uses a custom `serializer` and `adapter` that are
designed to work tightly with the [Spree](http://github.com/spree/spree) rails 
engine, via [Spree AMS](http://github.com/hhff/spree_ams).

This addon also adds the following models:
* Address
* Address
* Country
* Image
* Line Item
* Order
* Payment Method
* Payment
* Product Propert
* Product
* Shipment
* Shipping Category
* Shipping Method
* Shipping Rate
* Source
* State
* Stock Location
* Taxon
* Taxonomy
* User
* Variant
* Zone

Finally, this addon handles the UI State Persistance using browser local
storage. 

## Installation

```bash
ember install spree-ember-core
```

For full Spree Ember documentation, visit [http://www.spree-ember.com/](http://www.spree-ember.com).

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).

## Spree Ember

If you're just getting started, it's recommended that you checkout the Spree
Ember Storefront addon.  It's the quickest way to get up and running with Spree
Ember.
