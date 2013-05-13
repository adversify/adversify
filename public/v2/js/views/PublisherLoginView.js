window.adversify.views.PublisherLoginView = (function() {
	return Backbone.View.extend({
		initialize: function(options) {
			this.setModel(options.publisherModel);
			this.template = _.template(this.getTemplate("publisherLogin"));
		},

		render : function () {
			console.log('publisherLogin render');
			this.$el.html(this.template({publisher : this.model}));
		},

		setModel : function(model) {
			this.model = model;
		}

	});
})();