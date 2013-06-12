define([
	'jquery',
	'underscore',
	'backbone',
	'text!../../templates/home.html'
], function(
	$,
	_,
	Backbone,
	homeTemplate
){

	return Backbone.View.extend({
		initialize: function() {
			console.log(this);
			this.template = _.template(homeTemplate);
		},

		render: function() {
			$(this.el).html(this.template());
		},

		title: 'Home'
	});

});