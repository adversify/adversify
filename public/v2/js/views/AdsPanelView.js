define([
	'jquery',
	'underscore',
	'backbone',

	'../views/AddAdView',
	'../views/AdsListView',

	'text!../../templates/adsPanel.html'
], function(
	$,
	_,
	Backbone,

	AddAdView,
	AdsListView,

	adsPanelTemplate
){	return Backbone.View.extend({
		initialize: function(options) {
			this.subviews = {};
			this.setSubviews();
			this.template = _.template(adsPanelTemplate);
		},

		setSubviews: function() {
			this.subviews.addAd = new AddAdView({parentView:this});
			this.subviews.adsList = new AdsListView({parentView:this});
		},

		render : function () {
			var self = this;
			console.log('AdsPanelView render', this.$el);
			this.$el.html(self.template);
			this.subviews.addAd.render();
			this.$('.content').append(self.subviews.addAd.el);
			this.$(self.subviews.addAd.el).hide().addClass('slideFromRight');
			this.$('.content').append(self.subviews.adsList.el);
		},

		events: {
			'click .add-ad-button': 'showAddAdForm',
			'click .close-add-ad-form': 'hideAddAdForm'
		},

		showAddAdForm: function(evt) {
			console.log('showAddAdForm @AdsPanelView');
			this.$('.close-add-ad-form').show();
			this.$(this.subviews.addAd.el).show().removeClass('slideFromRight').addClass('slideToRight');
			evt.preventDefault();
		},

		hideAddAdForm: function(evt) {
			console.log('HideAddAdForm @AdsPanelView');
			this.$('.close-add-website-form').hide();
			this.$(this.subviews.addAd.el).removeClass('slideToRight').addClass('slideFromRight').hide();
			evt.preventDefault();
		},

		title: 'Ads management'

	});
});