# Contributing

There's tons of work to do.  This is a huge project, PR's are golden.

This guide was largely ripped from [Ember
CLI](https://github.com/ember-cli/ember-cli/blob/master/CONTRIBUTING.md), but hopefully we can make it our own
over time.

## Quickstart

Spree Ember uses four different Ember CLI addons operating together to allow
developers to plug-and-play functionality and only use what they require.

In order to setup the Spree Ember ecosystem, you have to symlink the addons to
each other, so that changes you make in one will be consumed by another locally.

#### Installation

```
git clone https://github.com/hhff/spree-ember.git
cd spree-ember
ruby bootstrap.rb
```

The Demo Application of the `storefront` package has the storefront installed, however
if you'd like to develop against a seperate Ember app, you'll want to link Spree Ember
to a host Application.

#### Linking local Spree Ember to a Host Application

```
ember new my-store
cd my-store
npm link spree-ember-storefront
```

Then make sure you add `"spree-ember-storefront":"*"` to your host application's
`package.json`.

You're now at the same step that `ember install spree-ember-storefront@0.0.1-beta-1`
would get you to, except your host application is linking to your local `spree-ember`
files, instead of NPM's version.

Be sure to follow the [Getting Started](http://www.spree-ember.com/3-getting-started.html)
guides to finish the setup.

#### Testing

Simply `cd` into each package and run tests with `ember test` or 
`ember test --server`.

### Known issues with this workflow:

- At the time of writing, nested addons are not officially supported by Ember CLI.
  In our case, they generally "just work", however anything that requires file 
  watching or linting on a nested package (like `core` or `checkouts`) will break.
  You'll need to restart your server when changing `core` or `checkouts`.

*Please see "Pull Requests" below for more information.*

## Questions

This is the issue tracker for `spree-ember`. The community uses this site
to collect and track bugs and discussions of new features. If you are
having difficulties using `spree-ember`, please search the issues, and if you
can't find anything useful, go ahead and open an issue.  Someone will help you
shortly.

## Issues

Think you've found a bug or have a new feature to suggest? Let us know!

### Reporting a Bug

1. Update to the most recent master release if possible. We may have already
   fixed your bug.

2. Search for similar issues. It's possible somebody has encountered this bug
   already.

3. Provide a demo that specifically shows the problem. This demo should be fully
   operational with the exception of the bug you want to demonstrate. The more
   pared down, the better. Issues with demos are prioritized.

4. Your issue will be verified. The provided demo will be tested for
   correctness. The team will work with you until your issue can be
   verified.

5. Keep up to date with feedback from the team on your ticket. Your
   ticket may be closed if it becomes stale.

6. If possible, submit a Pull Request with a failing test. Better yet, take
   a stab at fixing the bug yourself if you can!

The more information you provide, the easier it is for us to validate that
there is a bug and the faster we'll be able to take action.

### Requesting a Feature

1. Search Issues for similar feature requests. It's possible somebody has
   already asked for this feature or provided a pull request that we're still
   discussing.

2. Provide a clear and detailed explanation of the feature you want and why it's
   important to add. Keep in mind that we want features that will be useful to
   the majority of our users and not just a small subset. If you're just
   targeting a minority of users, consider writing an addon library for
   `ember-cli`.

3. If the feature is complex, consider writing some initial documentation for
   it. If we do end up accepting the feature it will need to be documented and
   this will also help us to understand it better ourselves.

4. Attempt a Pull Request. If you are willing to help the project out, you can
   submit a Pull Request. We always have more work to do than time to do it. If
   you can write some code then that will speed the process along.

# Pull Requests

We love pull requests. Here's a quick guide:

1. Fork the repo.

2. Ensure you have the development requirements:

   * node (0.12 recommended) or io.js (1.x) -- *do not install node using sudo*
   * npm (2.x)
   * phantomjs
   * Run bootstrap.rb to ensure each addon is working against itself.

3. Run `bootstrap.rb` from the `spree-ember` root of the project.  This will set
   the Addons to run against each other, ensuring that changes you make across
   multiple packages work with each other.

4. Add a test for your change. Only refactoring and documentation changes
   require no new tests. If you are adding functionality or fixing a bug, we
   need a test!

5. Make the test pass.

6. Commit your changes. If your pull request fixes an issue specify it in the
   commit message. Here's an example: `git commit - m "Close #52 Add taxonomy
   bar"`

7. Push to your fork and submit a pull request. In the pull-request title,
   please prefix it with one of our tags: BUGFIX, FEATURE, ENHANCEMENT or
   INTERNAL

   * FEATURE and ENHANCEMENT tags are for things that users are interested in.
     Avoid super technical talk. Craft a concise description of the change.
     - FEATURE tag is a standalone new addition, an example of this would be
       adding a new command
     - ENHANCEMENT tag is an improvement on an existing feature
   * BUGFIX tag is a link to a bug + a link to a patch.
   * INTERNAL tag is an internal log of changes.

   In the description, please provide us with some explanation of why you made
   the changes you made. For new features make sure to explain a standard use
   case to us.

We try to be quick about responding to tickets but sometimes we get a bit
backlogged. If the response is slow, try to find someone on [Spree Ember's
Gitter
Channel](https://gitter.im/hhff/spree-ember?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge) to
give the ticket a review.

Some things that will increase the chance that your pull request is accepted,
taken straight from the Ruby on Rails guide:

* Use Node idioms and helpers.
* Include tests that fail without your code, and pass with it.
* Update the documentation, the surrounding one, examples elsewhere, guides,
  whatever is affected by your contribution.

#### Syntax

* Two spaces, no tabs.
* No trailing whitespace. Blank lines should not have any space.
* Follow the conventions you see used in the source already.

#### Inline Documentation Guidelines

All inline documentation is written using YUIDoc. Follow these rules when
updating or writing new documentation:

1. All code blocks must be fenced.
2. All code blocks must have a language declared.
3. All code blocks must be valid code for syntax highlighting.
4. All examples in code blocks must be aligned.
5. Use two spaces between the code and the example: `foo(); // result`.
6. All references to code words must be enclosed in backticks.
7. Prefer a single space between sentences.
8. Wrap long markdown blocks > 80 characters.
9. Don't include blank lines after `@param` definitions.

#### Code Words

* `thisPropertyName`
* `Global.Class.attribute`
* `thisFunction()`
* `Global.CONSTANT_NAME`
* `true`, `false`, `null`, `undefined` (when referring to programming values)

And in case we didn't emphasize it enough: **we love tests!**

