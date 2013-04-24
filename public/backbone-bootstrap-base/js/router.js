
window.adversify.router =  (function(HomeView, TestView, WebsitesPanelView, AddWebsiteView, WebsitesListView) {
	return Backbone.Router.extend({
		routes: {
			"": "home",
			"test": "test",
			"websites": "websites",
			"addWebsite": "addWebsite"
		},

		initialize: function() {
			console.log('Router init');
			this.firstView = true;
		},


		home: function() {
			this.moveTo(new HomeView());
		},

		websites: function() {
			window.adversify.websites = new window.adversify.collections.websites();
			window.adversify.websites.fetch();
			this.moveTo(new WebsitesPanelView({websitesCollection:window.adversify.websites}));
		},

		addWebsite: function() {
			this.moveTo(new AddWebsiteView());
		},

		moveTo: function (view) {
			view.render();
			console.log('view rendered');
			$('#page-content').html($(view.el));
		}

	});
})(window.adversify.views.HomeView,window.adversify.views.TestView,window.adversify.views.WebsitesPanelView,window.adversify.views.AddWebsiteView, window.adversify.views.WebsitesListView);