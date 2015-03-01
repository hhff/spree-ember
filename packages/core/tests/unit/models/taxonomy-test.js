import {
  moduleForModel,
  test
} from 'ember-qunit';

moduleForModel('taxonomy', 'Taxonomy', {
  // Specify the other units that are required for this test.
  needs: [
    'model:taxon'
  ]
});

test('it exists', function(assert) {
  var model = this.subject();
  // var store = this.store();
  assert.ok(!!model);
});
