# Configuring Spree

There's a few steps you'll need to take to ensure your Spree server plays nice 
with your Spree Ember application.

### Create a new Spree App
***

**Note:** Your Spree App should be seperate to your Ember App.

Currently, we're only supporting the `3-0-stable` branch of Spree.  Head over to 
that [branch on Spree's Github](https://github.com/spree/spree/tree/3-0-stable) 
and follow the installation steps.

**Answer 'yes' to all of the prompts to install all Seed and Sample data**.

### Configure Spree
***

By default, Spree out-of-the-box is not cofigured to allow a complete checkout.
To be able to complete a full checkout flow, you'll also need to make some 
changes in Spree's backend.  Boot up the Spree server:

```bash
rails server
```

Then navigate to `localhost:3000/admin` and login as the newly created admin 
user (defaults: `spree@example.com`, `spree123`).

- Changes
- Other changes
- Changes TBD

Now, Spree is in a state that will allow a full checkout.

### Add spree_ams to the Gemfile
***

[Spree AMS](https://github.com/hhff/spree_ams) is a Spree Extension that adds a 
namespace to Spree's default API routes, that respond as per the 
[Active Model Serializers](https://github.com/rails-api/active_model_serializers/tree/0-8-stable) gem.

**Note:** This is the key to standardising the way Spree communicates with Ember.

Install the version that corresponds to your Spree version, and follow the
instructions to get it up and running.

#### **Nice!  Now you're ready to start 
[developing your Spree Ember store](http://spree-ember.com/4-development.html)!**
