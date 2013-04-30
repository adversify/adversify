window.adversify.views.WebsitesPanelView = (function() {
	return Backbone.View.extend({
		initialize: function(options) {
			this.subviews = {};
			this.setSubviews(options.websitesCollection);
			this.template = _.template(this.getTemplate("WebsitesPanel"));
		},

		setSubviews: function(websitesCollection) {
			this.subviews.addWebsite = new window.adversify.views.AddWebsiteView({parentView:this});
			this.subviews.websitesList = new window.adversify.views.WebsitesListView({parentView:this, websitesCollection:websitesCollection});
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
})();