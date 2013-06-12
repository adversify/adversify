define([
	'jquery',
	'underscore',
	'backbone',

	'../models/Publisher',

	'text!../../templates/publisherSettings.html'
], function(
	$,
	_,
	Backbone,

	PublisherModel,

	publisherSettingsTemplate
){	return Backbone.View.extend({
		initialize: function(options) {
			this.options = options || {};
			this.options.publisherId = "0987654321";
			var self = this;
			this.setModel(new PublisherModel({_id: self.options.publisherId}));
			this.model.fetch();
			this.template = _.template(publisherSettingsTemplate);
		},

		render : function () {
			console.log('UserSettingsView render');
			this.$el.html(this.template({publisher : this.model}));
		},

		setModel : function(model) {
			this.model = model;
		}

	});
});