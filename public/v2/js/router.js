
window.adversify.router =  (function(HomeView, TestView, WebsitesPanelView, AddWebsiteView, WebsitesListView, PublisherSettingsView, PublisherLoginView, PublisherSignupView) {
	return Backbone.Router.extend({
		routes: {
			"": "home",

			"websites": "websites",
			"website/new": "newWebsite",

			"ads": "ads",
			"ad/new": "newAd",

			"publisher/settings": "publisherSettings",
			"publisher/default": "publisherDefault",
			"publisher/login": "publisherLogin",
			"publisher/register": "publisherRegister",

			"advertiser/settings": "advertiserSettings",
			"advertiser/default": "advertiserDefault",
			"advertiser/login": "advertiserLogin",
			"advertiser/register": "advertiserRegister"
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

		newWebsite: function() {
			this.moveTo(new AddWebsiteView());
		},


		ads: function() {
			window.adversify.websites = new window.adversify.collections.websites();
			window.adversify.websites.fetch();
			this.moveTo(new WebsitesPanelView({websitesCollection:window.adversify.websites}));
		},

		newAdd: function() {
			this.moveTo(new AddWebsiteView());
		},


		publisherSettings : function() {
			var self = this;
			window.adversify.publisher = new window.adversify.models.publisher();
			window.adversify.publisher.fetch({success: function(model, response, options) {
				self.moveTo(new PublisherSettingsView({publisherModel:window.adversify.publisher}));
			}});
		},

		publisherLogin : function() {
			var self = this;
			window.adversify.publisher = new window.adversify.models.publisher();
			self.moveTo(new PublisherLoginView({publisherModel:window.adversify.publisher}));
		},

		publisherRegister : function() {
			var self = this;
			window.adversify.publisher = new window.adversify.models.publisher();
			self.moveTo(new PublisherSignupView({publisherModel:window.adversify.publisher}));
		},

		publisherDefault : function() {
			var self = this;
		},


		advertiserSettings : function() {
			var self = this;
			window.adversify.publisher = new window.adversify.models.publisher();
			window.adversify.publisher.fetch({success: function(model, response, options) {
				self.moveTo(new AdvertiserSettingsView({publisherModel:window.adversify.publisher}));
			}});
		},

		advertiserLogin : function() {
			var self = this;
			window.adversify.advertiser = new window.adversify.models.advertiser();
			self.moveTo(new AdvertiserLoginView({advertiserModel:window.adversify.advertiser}));
		},

		advertiserRegister : function() {
			var self = this;
			window.adversify.advertiser = new window.adversify.models.advertiser();
			self.moveTo(new AdvertiserSignupView({advertiserModel:window.adversify.advertiser}));
		},

		advertiserDefault : function() {
			var self = this;
		},

		moveTo: function (view) {
			view.render();
			$('#page-content').html($(view.el));
		}

	});
})(window.adversify.views.HomeView,window.adversify.views.TestView,window.adversify.views.WebsitesPanelView,window.adversify.views.AddWebsiteView, window.adversify.views.WebsitesListView, window.adversify.views.PublisherSettingsView, window.adversify.views.PublisherLoginView, window.adversify.views.PublisherSignupView);