define(["backbone", "../models/Website"], function(Backbone, WebsiteModel) {
	return Backbone.Collection.extend({

		url:'/publisher/websites',
		model: WebsiteModel

});

});