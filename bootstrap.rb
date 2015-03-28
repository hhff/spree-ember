#!/usr/bin/env ruby

puts "Spree Ember: Bootstrapping Development Environment."

system "npm install"

puts "Spree Ember: Creating NPM Links between packages."

spree_ember = Dir.pwd

# Setup Core Dependencies
Dir.chdir "./packages/core"
system "ember install"
system "npm link"
Dir.chdir spree_ember

# Setup Checkouts Dependencies
Dir.chdir "./packages/checkouts"
system "npm link ember-cli-spree-core"
system "ember install"
system "npm link"
Dir.chdir spree_ember

# Setup Auth Dependencies
Dir.chdir "./packages/auth"
system "npm link ember-cli-spree-core"
system "ember install"
system "npm link"
Dir.chdir spree_ember

# Setup Frontend Dependencies
Dir.chdir "./packages/frontend"
system "npm link ember-cli-spree-core"
system "npm link ember-cli-spree-checkouts"
system "ember install"
system "npm link"
Dir.chdir spree_ember

puts "Spree Ember: Done setting up local packages for development."