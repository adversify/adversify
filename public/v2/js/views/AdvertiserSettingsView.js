define([
	'jquery',
	'underscore',
	'backbone',
	'../models/Advertiser',
	'text!../../templates/advertiserSettings.html'
], function(
	$,
	_,
	Backbone,

	AdvertiserModel,

	advertiserSettingsTemplate
){	return Backbone.View.extend({
		initialize: function(options) {
			this.setModel(new AdvertiserModel({_id: 1234567890}));
			this.model.fetch();
			this.template = _.template(advertiserSettingsTemplate);
		},

		render : function () {
			console.log('UserSettingsView render');
			this.$el.html(this.template({advertiser : this.model}));
		},

		setModel : function(model) {
			this.model = model;
		}

	});
});