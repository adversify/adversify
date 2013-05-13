window.adversify.views.AdvertiserSignupView = (function() {
	return Backbone.View.extend({
		initialize: function(options) {
			this.setModel(options.advertiserModel);
			this.template = _.template(this.getTemplate("advertiserSignup"));
		},

		render : function () {
			console.log('advertiserSignup render');
			this.$el.html(this.template({advertiser : this.model}));
		},

		setModel : function(model) {
			this.model = model;
		}

	});
})();