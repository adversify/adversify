
window.adversify.router =  (function(
	HomeView,

	WebsitesPanelView,
	AddWebsiteView,
	WebsitesListView,

	AdsPanelView,
	AddAdView,
	AdsListView,

	PublisherSettingsView,
	PublisherLoginView,
	PublisherSignupView,

	AdvertiserSettingsView,
	AdvertiserLoginView,
	AdvertiserSignupView
) {
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
			window.adversify.ads = new window.adversify.collections.ads();
			window.adversify.ads.fetch();
			this.moveTo(new AdsPanelView({adsCollection:window.adversify.ads}));
		},

		newAdd: function() {
			this.moveTo(new AddAdView());
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
			window.adversify.advertiser = new window.adversify.models.advertiser();
			window.adversify.advertiser.fetch({success: function(model, response, options) {
				self.moveTo(new AdvertiserSettingsView({advertiserModel:window.adversify.advertiser}));
			}});
		},

		advertiserLogin : function() {
			var self = this;
			console.log(window.adversify.models);
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
})(
	window.adversify.views.HomeView,

	window.adversify.views.WebsitesPanelView,
	window.adversify.views.AddWebsiteView,
	window.adversify.views.WebsitesListView,

	window.adversify.views.AdsPanelView,
	window.adversify.views.AddAdView,
	window.adversify.views.AdsListView,

	window.adversify.views.PublisherSettingsView,
	window.adversify.views.PublisherLoginView,
	window.adversify.views.PublisherSignupView,

	window.adversify.views.AdvertiserSettingsView,
	window.adversify.views.AdvertiserLoginView,
	window.adversify.views.AdvertiserSignupView
);