window.adversify.views.PublisherSettingsView = (function() {
	return Backbone.View.extend({
		initialize: function(options) {
			this.setModel(options.publisherModel);
			this.template = _.template(this.getTemplate("publisherSettings"));
		},

		render : function () {
			console.log('UserSettingsView render');
			this.$el.html(this.template({publisher : this.model}));
		},

		setModel : function(model) {
			this.model = model;
		}

	});
})();