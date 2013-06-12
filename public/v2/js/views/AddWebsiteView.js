define([
	'jquery',
	'underscore',
	'backbone',

	'../models/Website',

	'text!../../templates/addWebsite.html'
], function(
	$,
	_,
	Backbone,

	WebsiteModel,

	addWebsiteTemplate
){
	return Backbone.View.extend({
		initialize: function(options) {
			options = options || {};
			this.parentView = options.parentView;
			this.template = _.template(addWebsiteTemplate);
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
			this.$('.error, .success').hide();
			var self = this;
			evt.preventDefault();
			console.log('Submit event on #add-website form FROM AddWebsiteView');
			var formCheck = this.formCheck;
			var websiteHash = {'infos':{}};
			_.each(this.addWebsiteForm.fields, function(field) {
				websiteHash.infos[field] = formCheck[field]();
			});
			var newWebsite = new WebsiteModel(websiteHash);
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
});