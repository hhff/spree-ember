#!/usr/bin/env ruby

puts "NPM Linking Spree Ember Packages"

root = Dir.pwd


Dir.chdir "./packages/core"
system "npm link"
Dir.chdir root

Dir.chdir "./packages/checkouts"
system "npm link ember-cli-spree-core"
system "npm link"
Dir.chdir root

Dir.chdir "./packages/auth"
system "npm link ember-cli-spree-core"
system "npm link"
Dir.chdir root

Dir.chdir "./packages/frontend"
system "npm link ember-cli-spree-core"
system "npm link ember-cli-spree-checkouts"
system "npm link"
Dir.chdir root