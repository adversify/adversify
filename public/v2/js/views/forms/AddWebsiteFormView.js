window.adversify.views.AddWebsiteFormView = (function() {
	return Backbone.View.extend({
		initialize: function(websitesCollection) {
			this.template = _.template(this.getTemplate("forms/addWebsiteForm"));
		},

		render : function () {
			this.$el.html(this.template());
		}
	});
})();