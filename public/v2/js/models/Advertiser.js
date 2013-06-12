define(["backbone"], function(Backbone) {
  return Backbone.Model.extend({
    initialize: function() {
      console.log('new advertiser model');
      console.log(this);
    },

    idAttribute: "_id",
    urlRoot: '/advertiser'

  });
});