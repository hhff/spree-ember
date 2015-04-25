# Customization

The Spree Ember frontend has been built carefully to provide stability, but not 
limit the developer.

### Defaults
***

TODO:
Environment Specific Defaults

### Zurb Foundation
***

Spree Ember's Frontend Addon ships with Zurb Foundation.  You may have noticed 
it was installed when you setup the frontend.  We chose Zurb Foundation because 
it allowed us to build a responsive frontend without writing a line of custom 
CSS.

This also means it's super easy to remove.


```bash
ember uninstall ember-cli-foundation-sass
```

#Generators

Generators allow you to copy files from an Ember Addon into your Ember host 
application.  This way they will override the Addon versions of themselves, and
allow the developer to deeply customize the way an Addon behaves.

### Templates
***

If you'd like to customize the templates, you'll first need to copy them from 
the Spree Frontend addon to you Ember host app.

```bash
ember generate spree-storefront-templates
```

You can now customize all of the templates used in the Spree Frontend!

### Components
***

If you're only looking to change the appearance of the Spree Frontend 
components, please see above.  This command also includes component templates.
However, there are cases when you might want to change how a component behaves.
In this case, you can copy all of the component controllers with this command:

```bash
ember generate spree-storefront-components
```

You'll now have your own versions of the default Spree Frontend components!

### Routes
***

For deeper customization, you'll want to deal with the routes.  Generate them
like so:

```bash
ember generate spree-storefront-routes
```

You'll now have the routes availble to your application, ready for
customization.

#### **Need to customize the Checkout Flow?  Checkout the [checkouts section](./6-checkouts.html).**
