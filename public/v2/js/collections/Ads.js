window.adversify.collections.ads = (function() {
	return Backbone.Collection.extend({

		url:'/publisher/ads',
		model: window.adversify.models.ad

});

})();