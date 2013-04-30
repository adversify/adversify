window.adversify.views.WebsitesListView = (function() {
	return Backbone.View.extend({
		initialize: function(options) {
			console.log('Init WebsitesListView');
			this.setCollection(options.websitesCollection);
			this.parentView = options.parentView;
			this.template = _.template(this.getTemplate("websitesList"));
		},

		events: {
			'click .delete-website-button': 'deleteWebsite',
			'click .edit-website-button': 'editWebsite',

			'click .delete-zone-button': 'deleteZone',
			'click .edit-zone-button': 'showEditZoneForm',

			'click .close-edit-zone-form' : 'hideEditZoneForm'
		},

		render : function () {
			console.log("@websitesListView RENDER");
			console.log('rendering with '+this.collection.models.length);
			this.$el.html(this.template({websites : this.collection.models }));
		},

		addOneWebsiteToDOM : function(model, collection, options) {
			console.log('addOneToDOM @WebsitesListView');
			this.itemTemplate = _.template(this.getTemplate("websiteItem"));
			this.$el.find("#websitesList").append(this.itemTemplate({website : model}));
		},

		removeOneWebsiteFromDOM : function(model, collection, options) {
			console.log('removeOneFromDOM @WebsitesListView');
			this.$el.find('#websitesList .website#'+model.id).remove();
		},

		addOneZoneToDOM : function(model, collection, options) {
			console.log('addOneZoneToDOM @WebsitesListView');
		},

		removeOneZoneFromDOM : function(model,collection,options) {
			console.log('removeOneFromDOM @WebsitesListView');
		},

		setZoneCollection : function(model, collection) {
			model.set({zones : collection});
			this.listenTo(collection, 'add', this.addOneZoneToDOM);
			this.listenTo(collection, 'remove', this.removeOneZoneFromDOM);
		},

		setCollection : function(collection) {
			this.collection = collection;
			this.listenTo(this.collection, 'reset', this.render);
			this.listenTo(this.collection, 'add', this.addOneWebsiteToDOM);
			this.listenTo(this.collection, 'remove', this.removeOneWebsiteFromDOM);
		},

		deleteWebsite: function(evt) {
			var websiteId = evt.currentTarget.getAttribute('adversify-id');
			var websiteModel = this.collection.get(websiteId);
			websiteModel.destroy();
			this.collection.remove(websiteModel);
			console.log('@deleteWebsite FROM WebsitesListView');
		},

		editWebsite: function(evt) {
			console.log('edit website');
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

		title: 'My websites'

	});
})();