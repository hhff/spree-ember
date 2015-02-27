# Spree Ember
[![Build Status](https://travis-ci.org/hhff/spree_ember.svg?branch=master)](https://travis-ci.org/hhff/spree_ember)

![Alt text](./docs/theme/assets/img/logo.svg?raw=true "Optional Title")


This project is under constant development!  It is far from finished.

This project rebuilds Spree Commerce's Frontend in EmberJS.  It uses Ember CLI and Spree AMS.

## Prerequisites

Spree Ember assumes the following:

* You have a rails server running Spree.
* That server has [Spree AMS](https://github.com/hhff/spree_ams) installed.
* That server is running on port 3000.

## Installation

Quick start:

    npm install -g ember-cli
    cd frontend
    npm install -g bower
    npm install
    bower install

Then run a server with:

    ember server

Or run tests with:

    ember test


## Contributing

### Overview

[Roadmap is here.](https://huboard.com/hhff/spree_ember)

Spree Ember consists of the following packages:

* core (Ember CLI Addon)
* frontend (Ember CLI App)
* backend (coming soon - Ember CLI App)
* gateway (coming soon - Ember CLI Addon)

### Working on Core

To develop against Core, you'll need to symlink core to your machine's global node_modules.

    cd core
    npm link
    cd ../frontend
    npm link ember-cli-spree-core

Now when you run ```ember server``` from the ```frontend``` directory, the project will use your local override, rather than the git version.

When we hit 0.0.1 we'll publish to NPM.

## Useful Links

* [Ember JS](http://emberjs.com/)
* [Ember CLI](http://www.ember-cli.com/)
* [Ember Inspector for Chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
* [Ember Inspector for Firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)
* [Git Subtrees Workflow](https://medium.com/@v/git-subtrees-a-tutorial-6ff568381844)
* [NPM Linking (Developing Core)](http://justjs.com/posts/npm-link-developing-your-own-npm-modules-without-tears)
