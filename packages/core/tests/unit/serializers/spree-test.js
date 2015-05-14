import Ember from 'ember';
import DS from 'ember-data';
import {
  moduleFor,
  test
} from 'ember-qunit';

moduleFor('serializer:spree', 'SpreeSerializer', {
  needs: ['store:spree']
});

// Replace this with your real tests.
test('it exists', function(assert) {
  var serializer = this.subject();
  assert.ok(serializer);
});

test('it only serializes DS attrs with persistToServer in their definition', function(assert) {
  var serializer = this.subject();
  assert.ok(serializer);

  var Song = DS.Model.extend({
    artistName: DS.attr("string", { persistToServer: true }),
    songName: DS.attr("string")
  });
  
  this.container.register("model:song", Song);
  this.container.register("transform:string", DS.StringTransform);

  var store = this.container.lookup("store:spree");
  
  Ember.run(function() {
    var newSong = store.createRecord("song", {
      artistName: "Miguel",
      songName: "Sure Thing"
    });
    
    var payload = newSong.serialize();

    assert.ok(payload);
    assert.equal(payload.artist_name, "Miguel");
    assert.throws(payload.song_name);
  });
});
