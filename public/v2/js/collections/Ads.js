define(["backbone", "../models/Ad"], function(Backbone, AdModel) {
	return Backbone.Collection.extend({

		url:'/advertiser/ads',
		model: AdModel

	});

});