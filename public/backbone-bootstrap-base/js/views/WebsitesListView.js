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
			'click .add-zone-button' : 'showAddZoneForm',
			'click .close-add-zone-form' : 'hideAddZoneForm',
			'click .submit-add-zone-form' : 'submitZoneAdd',

			'click .delete-zone-button': 'deleteZone',
			'click .edit-zone-button': 'showEditZoneForm',
			'click .submit-edit-zone-form': 'submitZoneEdit',
			'click .close-edit-zone-form' : 'hideEditZoneForm'
		},

		render : function () {
			console.log("@websitesListView RENDER");
			console.log('rendering with '+this.collection.models.length);
			console.log(this.collection);
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
			console.log(model);
			console.log(collection);
			console.log(options);
		},

		removeOneZoneFromDOM : function(model,collection,options) {
			console.log('removeOneFromDOM @WebsitesListView');
			this.$el.find('#websitesList .website #'+model.id).remove();
		},

		setZoneCollection : function(model, zoneCollection) {
			model.set({zones : zoneCollection}, {silent: true});
			this.listenTo(zoneCollection, 'add', this.addOneZoneToDOM);
			this.listenTo(zoneCollection, 'remove', this.removeOneZoneFromDOM);
		},

		setCollection : function(collection) {
			this.collection = collection;
			this.listenTo(this.collection, 'reset', this.render);
			this.listenTo(this.collection, 'change', this.render);
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

		showAddZoneForm: function(evt) {
			evt.preventDefault();
			var websiteId = evt.currentTarget.getAttribute('adversify-id');
			var websiteModel = this.collection.get(websiteId);
			var addZoneForm = this.$el.find('li#'+websiteId+' form.add-zone-form');
			addZoneForm.show();
		},

		hideAddZoneForm: function(evt) {
			evt.preventDefault();
			var websiteId = evt.currentTarget.getAttribute('adversify-id');
			var websiteModel = this.collection.get(websiteId);
			var addZoneForm = this.$el.find('li#'+websiteId+' form.add-zone-form');
			addZoneForm.hide();
		},

		submitZoneAdd: function(evt) {
			evt.preventDefault();
			var websiteId = evt.currentTarget.getAttribute('adversify-id');
			var websiteModel = this.collection.get(websiteId);
			var addZoneForm = this.$el.find('li#'+websiteId+' form.add-zone-form')[0];
			var zoneHash = {
				name : addZoneForm['name'].value,
				design: {},
				options: {}
			};
			this.setZoneCollection(websiteModel, websiteModel.zoneListToCollection());
				websiteModel.get('zones').add(zoneHash);
				websiteModel.save();
		},

		deleteZone: function(evt) {
			evt.preventDefault();
			var zoneId = evt.currentTarget.getAttribute('adversify-id');
			var websiteId = this.$el.find('li#'+zoneId).closest('.website').attr('id');
			var websiteModel = this.collection.get(websiteId);
			this.setZoneCollection(websiteModel, websiteModel.zoneListToCollection());
			websiteModel.get('zones').remove(websiteModel.get('zones').get(zoneId));
			websiteModel.set({'zones':websiteModel.get('zones').models});
			websiteModel.save();
			console.log('@EndOfDeleteZone');
		},

		submitZoneEdit: function(evt) {
			evt.preventDefault();
			var zoneId = evt.currentTarget.getAttribute('adversify-id');
			var websiteId = this.$el.find('li#'+zoneId).closest('.website').attr('id');
			var editZoneForm = this.$el.find('li#'+zoneId+' form.edit-zone-form')[0];
			var zoneHash = {
			'name' : editZoneForm['name'].value,
			'design': {
				'dimensions' : editZoneForm['design.dimensions'].value
			}, 'options': {
				'type' : editZoneForm['options.type'].value,
				'remuneration': editZoneForm['options.remuneration'].value
			}};
			var websiteModel = this.collection.get(websiteId);
			this.setZoneCollection(websiteModel, websiteModel.zoneListToCollection());
			var zoneModel = websiteModel.get('zones').get(zoneId);
			zoneModel.set(zoneHash);
			websiteModel.set('zones' , websiteModel.zoneCollectionToList());
			websiteModel.save(null, {
				success: function() {
					this.$('li#'+zoneId+' form.edit-zone-form').hide();
				},
				error: function() {
					alert("Unable to save your modifications.");
				}
			});
		},

		showEditZoneForm: function(evt) {
			var htmlEl = evt.currentTarget;
			var zoneId = htmlEl.getAttribute('adversify-id');
			var editZoneForm = this.$el.find('li#'+zoneId+' form.edit-zone-form');
			editZoneForm.show();
			evt.preventDefault();
		},

		hideEditZoneForm: function(evt) {
			var htmlEl = evt.currentTarget;
			var zoneId = htmlEl.getAttribute('adversify-id');
			var editZoneForm = this.$el.find('li#'+zoneId+' form.edit-zone-form');
			$(editZoneForm).hide();
			evt.preventDefault();
		},

		title: 'My websites',

		editZoneForm : {
			fields: ['zonename', 'zoneremuneration', 'zoneformat', 'zonedimensions']
		}

	});
})();