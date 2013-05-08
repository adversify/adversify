
window.adversify.router =  (function(HomeView, TestView, WebsitesPanelView, AddWebsiteView, WebsitesListView, PublisherSettingsView) {
	return Backbone.Router.extend({
		routes: {
			"": "home",
			"test": "test",
			"websites": "websites",
			"addWebsite": "addWebsite",
			"publisher/settings": "publisherSettings"
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

		publisherSettings : function() {
			window.adversify.publisher = new window.adversify.models.publisher("5165b701457264a995000001");
			window.adversify.publisher.fetch();
			this.moveTo(new PublisherSettingsView({publisherModel:window.adversify.publisher}));
		},

		moveTo: function (view) {
			view.render();
			$('#page-content').html($(view.el));
		}

	});
})(window.adversify.views.HomeView,window.adversify.views.TestView,window.adversify.views.WebsitesPanelView,window.adversify.views.AddWebsiteView, window.adversify.views.WebsitesListView, window.adversify.views.PublisherSettingsView);