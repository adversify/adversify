
define([
	'backbone',

	'views/HomeView',
	'views/WebsitesPanelView',
	'views/AddWebsiteView',
	'views/WebsitesListView',

	'views/AdsPanelView',
	'views/AddAdView',
	'views/AdsListView',

	'views/PublisherSettingsView',
	'views/PublisherLoginView',
	'views/PublisherSignupView',

	'views/AdvertiserSettingsView',
	'views/AdvertiserLoginView',
	'views/AdvertiserSignupView'
	], function(
		Backbone,

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
				this.moveTo(new WebsitesPanelView());
			},

			newWebsite: function() {
				this.moveTo(new AddWebsiteView());
			},


			ads: function() {
				this.moveTo(new AdsPanelView());
			},

			newAdd: function() {
				this.moveTo(new AddAdView());
			},

			publisherSettings : function() {
				var self = this;
				self.moveTo(new PublisherSettingsView());
			},

			publisherLogin : function() {
				var self = this;
				self.moveTo(new PublisherLoginView());
			},

			publisherRegister : function() {
				var self = this;
				self.moveTo(new PublisherSignupView());
			},

			publisherDefault : function() {
				var self = this;
			},


			advertiserSettings : function() {
				var self = this;
				self.moveTo(new AdvertiserSettingsView());
			},

			advertiserLogin : function() {
				var self = this;
				self.moveTo(new AdvertiserLoginView());
			},

			advertiserRegister : function() {
				var self = this;
				self.moveTo(new AdvertiserSignupView());
			},

			advertiserDefault : function() {
				var self = this;
			},

			moveTo: function (view) {
				view.render();
				$('#page-content').html($(view.el));
			}

		});
});