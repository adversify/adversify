define(["backbone"], function(Backbone) {
  return Backbone.Model.extend({
    initialize: function() {
      console.log('new model');
      console.log(this);
    },

    idAttribute: "_id",
    urlRoot: '/publisher/websites',
    defaults: {
      infos: {
        name: "Joshfire",
        url: "http://www.joshfire.com"
      },
      zones: [
        {
          name: 'Top Left LeaderBoard'
        },
        {
          name: 'End of page banner'
        }
      ]
    },

    zoneListToCollection: function() {
      var zoneList = this.get('zones');
      var self = this;
      var ZoneModel = Backbone.Model.extend({
        idAttribute: "_id",
        defaults: {
          website: self.id
        }
      });
      var ZoneCollection = Backbone.Collection.extend({
        model: ZoneModel
      });
     var collection = new ZoneCollection(zoneList);
     return collection;
    },

    zoneCollectionToList: function() {
      var zoneCollection = this.get('zones');
      return zoneCollection.toJSON();
    }

  });
});