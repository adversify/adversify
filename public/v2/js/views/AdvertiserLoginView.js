define([
	'jquery',
	'underscore',
	'backbone',
	'../models/Advertiser',
	'text!../../templates/advertiserLogin.html'
], function(
	$,
	_,
	Backbone,
	AdvertiserModel,
	advertiserLoginTemplate
){	return Backbone.View.extend({
		initialize: function(options) {
			this.options = options || {};
			this.setModel(new AdvertiserModel());
			this.template = _.template(advertiserLoginTemplate);
		},

		render : function () {
			console.log('advertiserLogin render');
			this.$el.html(this.template({advertiser : this.model}));
		},

		setModel : function(model) {
			this.model = model;
		},

		events: {
			'click .js-submit-advertiser-login' : 'submitAdvertiserLogin'
		},

		submitAdvertiserLogin: function(evt) {
			evt.preventDefault();
			var advertiserLoginForm = this.$('#advertiser-login')[0];
			var advertiserCredentialsHash = {
				login : advertiserLoginForm['login'].value,
				password : advertiserLoginForm['password'].value
			};
			$.ajax({
				type: "POST",
				url: "/advertiser/login",
				data: advertiserCredentialsHash
			}).done(function(response) {
				console.log('Success');
				console.log(response);
			}).fail(function(xhr) {
				console.log('Error');
				console.log(xhr);
			});
		}

	});
});