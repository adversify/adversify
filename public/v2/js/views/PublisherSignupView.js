define([
	'jquery',
	'underscore',
	'backbone',

	'../models/Publisher',

	'text!../../templates/publisherSignup.html'
], function(
	$,
	_,
	Backbone,

	PublisherModel,

	publisherSignupTemplate
){	return Backbone.View.extend({
		initialize: function(options) {
			this.setModel(new PublisherModel());
			this.template = _.template(publisherSignupTemplate);
		},

		events: {
			"click .submit-publisher-signup" : "submitPublisherSignup"
		},

		render : function () {
			console.log('publisherSignup render');
			this.$el.html(this.template({publisher : this.model}));
		},

		setModel : function(model) {
			this.model = model;
		},

		submitPublisherSignup: function(evt) {
			evt.preventDefault();
			var publisherSignupForm = this.$('#publisher-signup')[0];
			var publisherHash = {
				username : publisherSignupForm['username'].value,
				password : publisherSignupForm['password'].value,
				passwordConfirm : publisherSignupForm['password-confirm'].value,
				infos: {
					email : publisherSignupForm['email'].value
				}
			};
			if(publisherHash.password === publisherHash.passwordConfirm) {
				this.model.save(publisherHash, {
					success: function(model, response, options) {
						alert("Success");
					},
					error: function(model, xhr, options) {
						console.log("Error!");
						console.log(xhr);
					}
				});
			} else {
				console.log("Passwords are not equal!");
			}
		}

	});
});