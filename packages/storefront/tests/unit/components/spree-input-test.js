import {
  moduleForComponent,
  test
} from 'ember-qunit';

moduleForComponent('spree-input', {
  unit: true
});

test('it renders', function(assert) {
  assert.expect(2);

  var component = this.subject();
  assert.equal(component._state, 'preRender');

  this.render();
  assert.equal(component._state, 'inDOM');
});

test('it displays errors with punctuation and attribute name if possible', function(assert) {
  assert.expect(2);

  var component = this.subject();
  
  component.set('errors', [
    {
      attribute: "firstname",
      message: "can't be blank"
    },
    {
      attribute: "firstname",
      message: "can't be null"
    }
  ]);

  assert.equal(component.get('displayErrors'), "firstname can't be blank, firstname can't be null.");

  component.set('attributeName', 'First Name');
  assert.equal(component.get('displayErrors'), "First Name can't be blank, First Name can't be null.");
});
