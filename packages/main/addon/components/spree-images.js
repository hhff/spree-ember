import Ember from 'ember';
import layout from '../templates/components/spree-images';

export default Ember.Component.extend({
  layout: layout,
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
