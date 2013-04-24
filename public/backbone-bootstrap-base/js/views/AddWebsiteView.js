window.adversify.views.AddWebsiteView = (function() {
	return Backbone.View.extend({
		initialize: function(options) {
			options = options || {};
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
				console.log($('#add-website input["name"]').val());
			},
			url: function() {
				console.log($('#add-website input["url"]').val());
			}
		},

		showAddWebsiteForm: function(evt) {
			console.log('show addWebsite form');
			$('#addWebsiteForm').removeClass('slideFromRight').addClass('slideToRight');
			evt.preventDefault();
		},

		hideAddWebsiteForm: function(evt) {
			$('#addWebsiteForm').removeClass('slideToRight').addClass('slideFromRight');
			evt.preventDefault();
		},

		submitWebsite: function(evt) {
			evt.preventDefault();
			console.log('Submit event on #add-website form FROM AddWebsiteView');
			var formCheck = this.formCheck;
			var websiteHash = {'infos':{}};
			_.each(this.addWebsiteForm.fields, function(field) {
				websiteHash.infos[field] = formCheck[field]();
			});
			var newWebsite = new window.adversify.models.website(websiteHash);
			if(this.collection.length === 0) {
				this.collection.create(newWebsite, {wait: true});
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
						}
					}
				}
			);
			}
		},

		addWebsiteForm: {
			fields : ['name','url']
		}

	});
})();