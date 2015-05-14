import {
  moduleForComponent,
  test
} from 'ember-qunit';

moduleForComponent('spree-breadcrumbs');

test('it renders', function(assert) {
  assert.expect(2);

  // creates the component instance
  var component = this.subject();
  assert.equal(component._state, 'preRender');

  // renders the component to the page
  this.render();
  assert.equal(component._state, 'inDOM');
});

test('it correctly represents checkout state', function(assert) {
  assert.expect(6);

  var component = this.subject();
  component.set('checkoutSteps', [
    'address',
    'payment',
    'complete'
  ]);

  component.set('checkoutState', 'payment');

  var steps = component.get('steps');

  assert.equal(steps[0].name, 'address');
  assert.equal(steps[0].status, 'completed');

  assert.equal(steps[1].name, 'payment');
  assert.equal(steps[1].status, 'current');
 
  assert.equal(steps[2].name, 'complete');
  assert.equal(steps[2].status, 'unavailable');
});
