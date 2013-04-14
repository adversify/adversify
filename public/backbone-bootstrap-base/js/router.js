
window.adversify.router =  (function(HomeView, TestView, WebsitesView, AddWebsiteView) {
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
			this.moveTo(new WebsitesView(window.adversify.websites));
		},

		addWebsite: function() {
			this.moveTo(new AddWebsiteView());
		},

		moveTo: function (view) {
			console.log("MOVE TO");
			view.render();
			console.log('view rendered');
			$('#page-content').html($(view.el));
			this.lastView = this.currentView;
			this.currentView = view;
		}

	});
})(window.adversify.views.HomeView,window.adversify.views.TestView,window.adversify.views.WebsitesView,window.adversify.views.AddWebsiteView);