import Ember from 'ember';
import layout from '../templates/components/spree-images';
/**
  A variant aware image browser for the Spree PDP.
  
  **To Override:** You'll need to run the components generator:

  ```bash
  ember g spree-ember-storefront-components
  ```

  This will install all of the Spree Ember Storefront component files into your
  host application at `app/components/spree-*.js`, ready to be extended or
  overriden.

  @class SpreeImages
  @namespace Component
  @extends Ember.Component
*/
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
