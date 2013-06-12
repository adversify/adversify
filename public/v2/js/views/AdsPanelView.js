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
			this.subviews.addAd = AddAdView({parentView:this});
			this.subviews.adsList = AdsListView({parentView:this});
		},

		render : function () {
			console.log('AdsPanelView render', this.$el);
			this.$el.html(this.template);
			this.subviews.addAd.render();
			this.$('.content').append(this.subviews.addAd.el);
			this.$(this.subviews.addAd.el).hide().addClass('slideFromRight');
			this.$('.content').append(this.subviews.adsList.el);
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