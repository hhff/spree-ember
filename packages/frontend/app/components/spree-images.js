import Ember from 'ember';

export default Ember.Component.extend({
  activeImage: null,

  selectedImage: Ember.computed('activeImage', 'images.@each', function() {
    var activeImage = this.get('activeImage');
    if (activeImage) {
      return activeImage;
    } else {
      return this.get('images.firstObject');
    }
  }),

  actions: {
    selectImage: function(image) {
      this.set('activeImage', image);
      return false;
    }
  }
});
