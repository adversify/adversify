window.adversify.views.AdvertiserSignupView = (function() {
	return Backbone.View.extend({
		initialize: function(options) {
			this.setModel(options.advertiserModel);
			this.template = _.template(this.getTemplate("advertiserSignup"));
		},

		events: {
			"click .submit-advertiser-signup" : "submitAdvertiserSignup"
		},

		render : function () {
			console.log('advertiserSignup render');
			this.$el.html(this.template({advertiser : this.model}));
		},

		setModel : function(model) {
			this.model = model;
		},

		submitAdvertiserSignup: function(evt) {
			evt.preventDefault();
			var advertiserSignupForm = this.$('#advertiser-signup')[0];
			console.log(advertiserSignupForm);
			var advertiserHash = {
				username : advertiserSignupForm['username'].value,
				password : advertiserSignupForm['password'].value,
				passwordConfirm : advertiserSignupForm['password-confirm'].value,
				infos: {
					email : advertiserSignupForm['email'].value
				}
			};
			if(advertiserHash.password === advertiserHash.passwordConfirm) {
				this.model.save(advertiserHash, {
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
})();