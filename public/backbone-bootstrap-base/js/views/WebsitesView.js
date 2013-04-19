window.adversify.views.WebsitesView = (function() {
	return Backbone.View.extend({
		initialize: function(websitesCollection) {
			this.setCollection(websitesCollection);
			this.template = _.template(this.getTemplate("websites"));
		},

		render : function () {
			console.log('rendering with '+this.collection.models.length);
			this.$el.html(this.template({websites : this.collection.models }));
		},

		addOneToDOM : function(model, collection, options) {
			console.log('Adding one element to the DOM');
			this.itemTemplate = _.template(this.getTemplate("websiteItem"));
			this.$el.find("#websitesList").append(this.itemTemplate({website : model}));
		},

		removeOneFromDOM : function(model, collection, options) {
			this.$el.find('#websitesList .website#'+model.id).remove();
		},

		removeOneZoneFromDOM : function(model, collection, options) {
			this.$el.find('.website .websiteZone#'+model.id).remove();
		},

		setZoneCollection : function(model, collection) {
			model.set({zones : collection});
			//this.listenTo(collection, 'add', this.addOneZoneToDOM);
			this.listenTo(collection, 'remove', this.removeOneZoneFromDOM);
		},

		setCollection : function(collection) {
			this.collection = collection;
			this.listenTo(this.collection, 'reset', this.render);
			this.listenTo(this.collection, 'add', this.addOneToDOM);
			this.listenTo(this.collection, 'remove', this.removeOneFromDOM);
		},
		// TODO : clean events, don't bind to events that belong to subviews
		events: {
			'click .submit-add-website-form': 'submitWebsite',
			'click #add-website-button': 'showAddWebsiteForm',
			'click .close-add-website-form': 'hideAddWebsiteForm',
			'click .add-zone-button': 'addZone',
			'click  .edit-zone-button': 'showEditZoneForm',
			'click .delete-zone-button': 'deleteZone',
			'click .edit-website-button': 'editWebsite',
			'click .delete-website-button': 'deleteWebsite',
			'click .close-edit-zone-form': 'hideEditZoneForm'
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

		deleteWebsite: function(evt) {
			var websiteId = evt.currentTarget.getAttribute('adversify-id');
			var websiteModel = this.collection.get(websiteId);
			websiteModel.destroy();
			console.log('@deleteWebsite');
		},

		submitWebsite: function(evt) {
			evt.preventDefault();
			console.log('Submit event on #add-website form');
			var formCheck = this.formCheck;
			var websiteHash = {'infos':{}};
			_.each(this.addWebsiteForm.fields, function(field) {
				websiteHash.infos[field] = formCheck[field]();
			});
			var newWebsite = new window.adversify.models.website(websiteHash);
			if(this.collection.length === 0) {
				this.collection.create(newWebsite);
			} else if(this.collection.length >= 0){
				newWebsite.save(null,{
				success: function(model,response,options) {
					window.adversify.websites.add(model);
				},
				error: function(model,xhr,options) {
					if(xhr.responseText === 'website-already-exists') {
						console.log('website already exists');
					} else {
						var responseText = JSON.parse(xhr.responseText);
						if(responseText.name === 'ValidationError'){
							if(responseText.errors['infos.url']){
								console.log('Url validation failed');
							} else if(responseText.errors['infos.name']) {
								console.log('Name validation failed');
							} else {
								console.log('Validation failed ...', console.log(responseText.errors));
							}
					}

				}}}
			);
			}
		},

		showAddWebsiteForm: function(evt) {
			$('#addWebsiteForm').removeClass('slideFromRight').addClass('slideToRight');
			evt.preventDefault();
		},

		hideAddWebsiteForm: function(evt) {
			$('#addWebsiteForm').removeClass('slideToRight').addClass('slideFromRight');
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

		title: 'My websites'

	});
})();