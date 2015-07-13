import Ember from 'ember';
import {
  moduleForComponent,
  test
} from 'ember-qunit';

// fails if ember-qunit = 0.4.X 
// Cannot read property 'recognizer' of undefined
// fixed in the beta channel (but won't be back ported to 1.13 most likely)
// https://github.com/switchfly/ember-test-helpers/issues/41

moduleForComponent('spree-auth', 'Unit | Component | spree-auth', {
  // specify the other units that are required for this test
  needs: [
    'component:spree-input'
  ]
});

test('it renders', function(assert) {
  assert.expect(2);

  var component = this.subject();
  assert.equal(component._state, 'preRender');

  this.render();
  assert.equal(component._state, 'inDOM');
});

test('it renders password confirmation if it isSignup is true', function(assert) {
  assert.expect(4);
  var matches;
  var component = this.subject();
  assert.equal(component._state, 'preRender');

  this.render();
  assert.equal(component._state, 'inDOM');

  matches = this.$().find('input[placeholder="Password Confirmation"]');
  assert.equal(matches.length, 0);

  Ember.run(function() {
    component.set('isSignup', true);
  });

  matches = this.$().find('input[placeholder="Password Confirmation"]');
  assert.equal(matches.length, 1);
});
