window.adversify.views.AdvertiserSettingsView = (function() {
	return Backbone.View.extend({
		initialize: function(options) {
			this.setModel(options.advertiserModel);
			this.template = _.template(this.getTemplate("advertiserSettings"));
		},

		render : function () {
			console.log('UserSettingsView render');
			this.$el.html(this.template({advertiser : this.model}));
		},

		setModel : function(model) {
			this.model = model;
		}

	});
})();