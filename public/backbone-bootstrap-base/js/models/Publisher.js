window.adversify.models.publisher = (function() {
  return Backbone.Model.extend({
    initialize: function() {
      console.log('new Publisher model');
      console.log(this);
    },

    idAttribute: "_id",
    urlRoot: '/publisher/get'

  });
})();