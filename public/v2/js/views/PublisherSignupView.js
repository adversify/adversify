window.adversify.views.PublisherSignupView = (function() {
	return Backbone.View.extend({
		initialize: function(options) {
			this.setModel(options.publisherModel);
			this.template = _.template(this.getTemplate("publisherSignup"));
		},

		render : function () {
			console.log('publisherSignup render');
			this.$el.html(this.template({publisher : this.model}));
		},

		setModel : function(model) {
			this.model = model;
		}

	});
})();