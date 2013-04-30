window.adversify.views.WebsitesPanelView = (function() {
	return Backbone.View.extend({
		initialize: function(options) {
			this.subviews = {};
			this.setSubviews(options.websitesCollection);
			this.template = _.template(this.getTemplate("WebsitesPanel"));
		},

		setSubviews: function(websitesCollection) {
			this.subviews.addWebsite = new window.adversify.views.AddWebsiteView({parentView:this});
			this.subviews.websitesList = new window.adversify.views.WebsitesListView(websitesCollection);
			this.subviews.addWebsite.bind('new-website', function() {
				console.log('coucou');
			});
		},

		handleNewWebsite: function() {
			console.log('coucou');
			console.log(this);
		},

		render : function () {
			console.log('WebsitesPanelView render');
			console.log(this.$el);
			this.$el.html(this.template);
			this.subviews.addWebsite.render();
			this.$el.find('.content').append(this.subviews.addWebsite.el);
			this.$el.find(this.subviews.addWebsite.el).hide().addClass('slideFromRight');
			this.$el.find('.content').append(this.subviews.websitesList.el);
			this.$el.find(this.subviews.websitesList.el);
		},

		events: {
			'click .add-website-button': 'showAddWebsiteForm',
			'click .close-add-website-form': 'handleNewWebsite'
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

		addZone: function(evt) {
			console.log(evt.currentTarget);
		},

		deleteZone: function(evt) {
			var zoneId = evt.currentTarget.getAttribute('adversify-id');
			var websiteId = $('li#'+zoneId).closest('.website').attr('id');
			var websiteModel = this.collection.get(websiteId);
			this.setZoneCollection(websiteModel, websiteModel.zoneListToCollection());
			websiteModel.get('zones').remove(websiteModel.get('zones').get(zoneId));
			websiteModel.set({'zones':websiteModel.get('zones').models});
			websiteModel.save();
			console.log('@EndOfDeleteZone');
			/*

$("table").delegate("input.chk", "click", function(){
  $(this).closest('tr').find(".disabled").show();
});


			*/
		},

		editWebsite: function(evt) {
			console.log(evt.currentTarget);
		},

		submitZoneEdit: function(evt) {
			evt.preventDefault();
			var htmlEl = evt.currentTarget;
			var zoneId = htmlEl.getAttribute('adversify-id');
			var editZoneForm = $('li#'+zoneId+' form.edit-zone-form');
			var zoneHash = {'design': {}, 'options': {}};
			_.each(this.editZoneForm.fields, function(field) {
				zoneHash[field] = field;
			});
			console.log(zoneHash);
		},

		showAddWebsiteForm: function(evt) {
			console.log('showAddWebsiteForm @WebsitesPanelView');
			this.$el.find('.close-add-website-form').show();
			this.$el.find(this.subviews.addWebsite.el).show().removeClass('slideFromRight').addClass('slideToRight');
			evt.preventDefault();
		},

		hideAddWebsiteForm: function(evt) {
			this.$el.find('.close-add-website-form').hide();
			this.$el.find(this.subviews.addWebsite.el).removeClass('slideToRight').addClass('slideFromRight').hide();
			evt.preventDefault();
		},

		showEditZoneForm: function(evt) {
			var htmlEl = evt.currentTarget;
			var zoneId = htmlEl.getAttribute('adversify-id');
			var editZoneForm = $('li#'+zoneId+' form.edit-zone-form');
			editZoneForm.show();
			evt.preventDefault();
		},

		hideEditZoneForm: function(evt) {
			var htmlEl = evt.currentTarget;
			var zoneId = htmlEl.getAttribute('adversify-id');
			var editZoneForm = $('li#'+zoneId+' form.edit-zone-form');
			editZoneForm.hide();
			evt.preventDefault();
		},

		addWebsiteForm: {
			fields : ['name','url']
		},

		editZoneForm: {
			fields : ['name','options','design','dimensions']
		},

		title: 'My websites'

	});
})();