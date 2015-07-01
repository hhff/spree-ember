# Spree Ember Core

[![Build Status](https://travis-ci.org/hhff/spree-ember.svg?branch=master)](https://travis-ci.org/hhff/spree-ember)
[![Join the chat at https://gitter.im/hhff/spree-ember](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/hhff/spree-ember?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![Code Climate](https://codeclimate.com/github/hhff/spree-ember.png)](https://codeclimate.com/github/hhff/spree-ember)
[![Inline docs](http://inch-ci.org/github/hhff/spree-ember.png)](http://inch-ci.org/github/hhff/spree-ember)

Spree Ember Core is the core dependency of all other Spree Ember addons.  It
provides the `spree` service, which has a seperate `store` to the host
application.

This store uses a custom `serializer` and `adapter` that are
designed to work tightly with the [Spree](http://github.com/spree/spree) rails 
engine, via [Spree AMS](http://github.com/hhff/spree_ams).

```bash
this.spree.store.find("product");
```

**Note:** This Package is included with `spree-ember-storefront`.  If you're
using that, there's no need to install this seperately.

This addon also adds the following models to the global namespace:
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

If you're just getting started, it's recommended that you checkout the
`spree-ember-storefront` addon instead.  It's the quickest way to get up and 
running with Spree Ember.
