# Configuring Spree

There's a few steps you'll need to take to ensure your Spree server plays nice 
with your Spree Ember application.

### Create a new Spree App
***

**Note:** Your Spree App should be seperate to your Ember App.

Currently, we're only supporting the `3-0-stable` branch of Spree.  Head over to 
that [branch on Spree's Github](https://github.com/spree/spree/tree/3-0-stable) 
and follow the installation steps.

**TL;DR**

```bash
gem install rails -v 4.2.1
gem install spree
rails _4.2.1_ new my_store_backend -B
spree install my_store_backend --branch "3-0-stable"
```

**Answer 'yes' to all of the prompts to install all Seed and Sample data**.

### Add spree_ams to the Gemfile
***

[Spree AMS](https://github.com/hhff/spree_ams) is a Spree Extension that adds a 
namespace to Spree's default API routes, that respond as per the 
[Active Model Serializers](https://github.com/rails-api/active_model_serializers/tree/0-8-stable) gem.

**Note:** This is the key to standardising the way Spree communicates with Ember.

Follow the instructions on the Spree AMS Readme to install it into your Spree
application.

**TL;DR**


```bash
cd my_store_backend
echo "\ngem 'spree_ams', :github => 'hhff/spree_ams', :branch => '3-0-alpha'" >> Gemfile
bundle
rails g spree:api:ams:install
```

In ```config/environments/development.rb``` add:
```
config.action_controller.asset_host = 'http://localhost:3000'
```

### Start your Rails Server
***

Let's start the Rails Server, and leave it running:

```bash
spring rails server
```

**Note:** By default, Spree Ember expects the Rails Server running at
`http://localhost:3000`.  You can change this later.

### Gotchas
***

* Unless you're using Spree in `RAILS_ENV=development`, the Rails server will
  attempt to send a confirmation message when the order state transitions from
  `confirm` to `complete`.  You'll see something like: `{exception: "connect(2)
  connection refused"}` in your server response.  Just configure SMTP for your
  production environment in the standard Rails way, and you're good.

**Note:** If you're having trouble getting started, check out the
[spree-ember-testing](https://github.com/hhff/spree-ember-testing) Rails example.
This is the Spree application we run at `http://testing.spree-ember.com` for live 
Ember acceptance tests.

#### **Nice!  Now you're ready to [get started with Spree Ember.](./3-getting-started.html)**
