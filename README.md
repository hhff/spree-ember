![Alt text](https://rawgit.com/hhff/spree-ember/master/docs/theme/assets/img/logo.svg)

---

[![Build Status](https://travis-ci.org/hhff/spree-ember.svg?branch=master)](https://travis-ci.org/hhff/spree-ember)
[![Join the chat at https://gitter.im/hhff/spree-ember](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/hhff/spree-ember?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

An Ember Ecosystem for [Spree Commerce](https://github.com/spree/spree).

### Quickstart

```
rails _4.1.8_ new my-backend
spree install my-backend --branch “2-3-stable” -A
cd my-backend
```
Add `gem 'spree_ams', github: 'hhff/spree_ams', branch: '2-3-stable'` to your Gemfile.

```
bundle install
rails server
```

### Meanwhile, in a Second Terminal

```
ember new my-store
cd my-store
ember install:addon spree-ember
ember server
```

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
