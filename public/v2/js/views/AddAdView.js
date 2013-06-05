window.adversify.views.AddAdView = (function() {
	return Backbone.View.extend({
		initialize: function(options) {
			options = options || {};
			this.parentView = options.parentView;
			this.template = _.template(this.getTemplate("addAd"));
			console.log('Add an ad');
		},

		render : function () {
			console.log('Add ad subview render');
			this.$el.html(this.template());
		},

		events: {
			'submit #add-ad': 'submitAd'
		},

		submitAd: function(evt) {
			this.$('.error, .success').hide();
			var self = this;
			evt.preventDefault();
			console.log('Submit event on #add-website form FROM AddWebsiteView');
			var formCheck = this.formCheck;
			var websiteHash = {'infos':{}};
			_.each(this.addWebsiteForm.fields, function(field) {
				websiteHash.infos[field] = formCheck[field]();
			});
			var newWebsite = new window.adversify.models.website(websiteHash);
			if(this.parentView && this.parentView.subviews.websitesList.collection.length === 0) {
				this.parentView.subviews.websitesList.collection.create(newWebsite, {wait: true});
			} else {
				newWebsite.save(null,{
					success: function(model,response,options) {
						if(self.parentView) {
							self.parentView.subviews.websitesList.collection.add(newWebsite);
							self.$el.hide();
						}
						self.$('.success').html("Website successfully added").show();
					},
					error: function(model,xhr,options) {
						if(xhr.responseText === 'website-already-exists') {
							self.$('.error').html("Sorry, this website already exsits").show();
						} else {
							var responseText = JSON.parse(xhr.responseText);
							if(responseText.name === 'ValidationError'){
								if(responseText.errors['infos.url']){
									self.$('.error').html("Sorry, this website already exists").hide();
								} else if(responseText.errors['infos.name']) {
									self.$('.error').html("Sorry, the name of the website is not valid.").hide();
								} else {
									self.$('.error').html("Sorry, an error occured").hide();
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