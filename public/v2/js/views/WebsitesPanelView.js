define([
	'jquery',
	'underscore',
	'backbone',

	'../views/AddWebsiteView',
	'../views/WebsitesListView',

	'text!../../templates/websitesPanel.html'
], function(
	$,
	_,
	Backbone,

	AddWebsiteView,
	WebsitesListView,

	websitesPanelTemplate
){	return Backbone.View.extend({
		initialize: function(options) {
			this.subviews = {};
			this.setSubviews();
			this.template = _.template(websitesPanelTemplate);
		},

		setSubviews: function() {
			this.subviews.addWebsite = new AddWebsiteView({parentView:this});
			this.subviews.websitesList = new WebsitesListView({parentView:this});
		},

		render : function () {
			console.log('WebsitesPanelView render');
			console.log(this.$el);
			this.$el.html(this.template);
			this.subviews.addWebsite.render();
			this.$el.find('.content').append(this.subviews.addWebsite.el);
			this.$el.find(this.subviews.addWebsite.el).hide().addClass('slideFromRight');
			this.$el.find('.content').append(this.subviews.websitesList.el);
		},

		events: {
			'click .add-website-button': 'showAddWebsiteForm',
			'click .close-add-website-form': 'hideAddWebsiteForm'
		},

		formCheck: {
			name: function() {
				var nameInputValue = $('#add-website input[name="name"]').val();
				return nameInputValue.length <= 30 ? nameInputValue : '';
			},
			url: function() {
				var urlInputValue = $('#add-website input[name="url"]').val();
				return urlInputValue.length <= 30 ? urlInputValue : '';
			}
		},

		showAddWebsiteForm: function(evt) {
			console.log('showAddWebsiteForm @WebsitesPanelView');
			this.$el.find('.close-add-website-form').show();
			this.$el.find(this.subviews.addWebsite.el).show().removeClass('slideFromRight').addClass('slideToRight');
			evt.preventDefault();
		},

		hideAddWebsiteForm: function(evt) {
			console.log('HideAddWebsiteForm @WebsitesPanelView');
			this.$el.find('.close-add-website-form').hide();
			this.$el.find(this.subviews.addWebsite.el).removeClass('slideToRight').addClass('slideFromRight').hide();
			evt.preventDefault();
		},

		title: 'My websites'

	});
});