var requirejsConfig = {
    paths: {
      "jquery": "../lib/jquery-2.0.2.min",
      "underscore": "../lib/underscore-min",
      "backbone": "../lib/backbone-min",
      "text" : "../lib/text"
	},
	shim: {
		'backbone': {
			deps: ['underscore', 'jquery'],
			exports: 'Backbone'
		},
        'underscore': {
            exports: '_'
        }
	}
};

requirejs.config(requirejsConfig);


define(["jquery", "backbone", "router"], function($, Backbone, Router) {

	$(document).ready(function() {
		console.log('Adversify init');
		this.router = new Router();
		Backbone.history.start();
	});

});