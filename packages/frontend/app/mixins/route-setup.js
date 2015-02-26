import Ember from 'ember';

export default Ember.Mixin.create({
  activate: function() {
    this._super();

    if (this.get('spreeFrontend')) {
      this.set('spree.frontend', this.get('spreeFrontend'));
    } else {
      this.set('spree.frontend', Ember.Object.create());
    }
  }
});
