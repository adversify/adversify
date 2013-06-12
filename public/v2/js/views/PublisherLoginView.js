define([
	'jquery',
	'underscore',
	'backbone',

	'../models/Publisher',

	'text!../../templates/publisherLogin.html'
], function(
	$,
	_,
	Backbone,

	PublisherModel,

	publisherLoginTemplate
){	return Backbone.View.extend({
		initialize: function(options) {
			this.setModel(new PublisherModel());
			this.template = _.template(publisherLoginTemplate);
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
});