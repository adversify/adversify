window.adversify.views.TestView = (function() {

	return Backbone.View.extend({
		initialize: function() {
			this.template = _.template(this.getTemplate("test"));
		},

		render: function() {
			$(this.el).html(this.template());
		}
});

})();