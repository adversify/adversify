window.adversify.views.AdsPanelView = (function() {
	return Backbone.View.extend({
		initialize: function(options) {
			this.subviews = {};
			this.setSubviews(options.adsCollection);
			this.template = _.template(this.getTemplate("adsPanel"));
		},

		setSubviews: function(adsCollection) {
			this.subviews.addAd = new window.adversify.views.AddAdView({parentView:this});
			this.subviews.adsList = new window.adversify.views.AdsListView({parentView:this, adsCollection:adsCollection});
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
})();