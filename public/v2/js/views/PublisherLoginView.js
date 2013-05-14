window.adversify.views.PublisherLoginView = (function() {
	return Backbone.View.extend({
		initialize: function(options) {
			this.setModel(options.publisherModel);
			this.template = _.template(this.getTemplate("publisherLogin"));
		},

		render : function () {
			console.log('publisherLogin render');
			this.$el.html(this.template({publisher : this.model}));
		},

		setModel : function(model) {
			this.model = model;
		},

		events: {
			'click .js-submit-publisher-login' : 'submitPublisherLogin'
		},

		submitPublisherLogin: function(evt) {
			evt.preventDefault();
			var publisherLoginForm = this.$('#publisher-login')[0];
			var publisherCredentialsHash = {
				login : publisherLoginForm['login'].value,
				password : publisherLoginForm['password'].value
			};
			$.ajax({
				type: "POST",
				url: "/publisher/login",
				data: publisherCredentialsHash
			}).done(function(response) {
				console.log(response);
			}).fail(function(xhr) {
				console.log(xhr);
			});
		}

	});
})();