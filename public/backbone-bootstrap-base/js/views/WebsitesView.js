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

		addOne : function(model, collection, options) {
			consolelog('Adding one element to the DOM');
			this.itemTemplate = _.template(this.getTemplate("websiteItem"));
			this.$el.find("#websitesList").append(this.itemTemplate({website : model}));
		},

		setCollection : function(collection) {
			this.collection = collection;
			this.listenTo(this.collection, 'reset', this.render);
			this.listenTo(this.collection, 'add', this.addOne);
			this.collection.bind("remove", function(model,collection,options) {
				console.log('remove event on the collection');
				this.render();
			}, this);
			console.log('Just set the collection with '+this.collection.length);
		},

		events: {
			'click .submit-add-website-form': 'submitWebsite',
			'click #add-website-button': 'showAddWebsiteForm',
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

		submitWebsite: function(evt) {
			evt.preventDefault();
			console.log('Submit event on #add-website form');
			var formCheck = this.formCheck;
			var websiteHash = {'infos':{}};
			_.each(this.addWebsiteForm.fields, function(field) {
				websiteHash.infos[field] = formCheck[field]();
			});
			var newWebsite = new window.adversify.models.website(websiteHash);
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
		},

		showAddWebsiteForm: function(evt) {
			$('#addWebsiteForm').removeClass('slideFromRight').addClass('slideToRight');
			evt.preventDefault();
		},

		hideAddWebsiteForm: function(evt) {
			$('#addWebsiteForm').removeClass('slideToRight').addClass('slideFromRight');
			evt.preventDefault();
		},

		addWebsiteForm: {
			fields : ['name','url']
		},

		title: 'My websites'

	});
})();