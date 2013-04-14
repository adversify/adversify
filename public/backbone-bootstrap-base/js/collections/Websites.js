window.adversify.collections.websites = (function() {
	return Backbone.Collection.extend({

		url:'/publisher/websites',
		model: window.adversify.models.website

});

})();