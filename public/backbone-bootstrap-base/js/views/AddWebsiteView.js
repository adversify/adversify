window.adversify.views.AddWebsiteView = (function() {
	return Backbone.View.extend({
		initialize: function(options) {
			options = options || {};
			this.parentView = options.parentView;
			this.template = _.template(this.getTemplate("addWebsite"));
			console.log('Add a website subview init');
		},

		render : function () {
			console.log('Add Website subview render');
			this.$el.html(this.template());
		},

		events: {
			'submit #add-website': 'submitWebsite'
		},

		formCheck: {
			name: function() {
				return $('#add-website input.name').val();
			},
			url: function() {
				return $('#add-website input.url').val();
			}
		},

		addWebsiteForm: {
			fields : ['name','url']
		},

		submitWebsite: function(evt) {
			var self = this;
			evt.preventDefault();
			console.log('Submit event on #add-website form FROM AddWebsiteView');
			var formCheck = this.formCheck;
			var websiteHash = {'infos':{}};
			_.each(this.addWebsiteForm.fields, function(field) {
				websiteHash.infos[field] = formCheck[field]();
			});
			var newWebsite = new window.adversify.models.website(websiteHash);
			if(this.parentView.subviews.websitesList.collection.length === 0) {
				this.parentView.subviews.websitesList.collection.create(newWebsite, {wait: true});
			} else if(this.parentView.subviews.websitesList.collection.length > 0){
				newWebsite.save(null,{
					success: function(model,response,options) {
						self.collection.add(model);
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
									console.log('Validation failed ...', responseText.errors);
								}
							}
						}
					}
				}
			);
			}
		}

	});
})();