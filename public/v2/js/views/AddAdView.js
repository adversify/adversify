define([
	'jquery',
	'underscore',
	'backbone',
	'text!../../templates/addAd.html'
], function(
	$,
	_,
	Backbone,
	addAdTemplate
){	return Backbone.View.extend({
		initialize: function(options) {
			options = options || {};
			this.parentView = options.parentView;
			this.template = _.template(addAdTemplate);
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
			var adForm = $(evt.currentTarget);
			var adHash = {'infos':{ 'name' : adForm.find('.name').val() }};
			var newAd = new window.adversify.models.ad(adHash);
			if(this.parentView && this.parentView.subviews.adsList.collection.length === 0) {
				console.log('Creating the collection');
				console.log(this.parentView.subviews.adsList.collection);
				this.parentView.subviews.adsList.collection.create(newAd, {wait: true});
			} else {
				newAd.save(null,{
					success: function(model,response,options) {
						if(self.parentView) {
							self.parentView.subviews.adsList.collection.add(newAd);
							self.$el.hide();
						}
						self.$('.success').html("Ad successfully added").show();
					},
					error: function(model,xhr,options) {
						var responseText = JSON.parse(xhr.responseText);
						if(responseText.name === 'ValidationError'){
							if(responseText.errors['infos.name']) {
								self.$('.error').html("Sorry, the name of the website is not valid.").hide();
							} else {
								self.$('.error').html("Sorry, an error occured").hide();
							}
						} else {
							self.$('.error').html("Sorry, an error occured").hide();
						}
					}
				}
			);
			}
		}

	});
});