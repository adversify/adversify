window.adversify.views.AdvertiserLoginView = (function() {
	return Backbone.View.extend({
		initialize: function(options) {
			this.setModel(options.publisherModel);
			this.template = _.template(this.getTemplate("advertiserLogin"));
		},

		render : function () {
			console.log('advertiserLogin render');
			this.$el.html(this.template({advertiser : this.model}));
		},

		setModel : function(model) {
			this.model = model;
		}

	});
})();