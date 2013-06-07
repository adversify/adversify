window.adversify.collections.ads = (function() {
	return Backbone.Collection.extend({

		url:'/advertiser/ads',
		model: window.adversify.models.ad

});

})();