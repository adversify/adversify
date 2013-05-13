window.adversify.views.HomeView = (function() {
	return Backbone.View.extend({
		initialize: function() {
			this.template = _.template(this.getTemplate("home"));
		},

		render: function() {
			$(this.el).html(this.template());
		},

		title: 'Home'
	});
})();