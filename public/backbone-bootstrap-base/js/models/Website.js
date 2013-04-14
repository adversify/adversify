window.adversify.models.website = (function() {
  return Backbone.Model.extend({
    initialize: function() {
      console.log('new model');
      console.log(this);
    },

    idAttribute: "_id",
    url: '/publisher/websites',
    defaults: {
      infos: {
        name: "Joshfire",
        url: "http://www.joshfire.com"      },
      zones:
        [
          {
            name: 'Top Left LeaderBoard'
          },
          {
            name: 'End of page banner'
          }
        ]
    }
  });
})();