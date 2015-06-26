import Ember from 'ember';
import { 
  module, 
  test 
} from 'qunit';
import startApp from '../helpers/start-app';

var application;

module('Acceptance: Walkthrough', {
  beforeEach: function() {
    application = startApp();
  },

  afterEach: function() {
    Ember.run(application, 'destroy');
    window.localStorage.clear();
  }
});

test('taxons test', function(assert) {
  visit('/products');
  
  andThen(function() {
    assert.equal(currentPath(), 'spree.products.index');
  });

  andThen(function() {
    assert.equal(find('h4.taxonomy-root:first').text(), 'Categories');
    var bagsLink = find('a.list-group-item:first');
    assert.equal(bagsLink.text(), 'Bags');
    click(bagsLink);
  });

  andThen(function() {
    assert.equal(currentPath(), "spree.taxons.index");
    assert.equal(find('.row h1').text(), "Shop by Bags");
  });
});
