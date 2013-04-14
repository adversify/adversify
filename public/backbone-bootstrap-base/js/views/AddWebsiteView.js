window.adversify.views.AddWebsiteView = (function() {
	return Backbone.View.extend({
		initialize: function() {
			this.template = _.template(this.getTemplate("addWebsite"));
			console.log(this.title);
		},

		title : 'Add a website',

		render : function () {
			console.log('view render');
			this.$el.html(this.template());
		},

		setCollection : function(collection) {
			if(this.collection) {
				this.unbind(this.collection, 'change');
				this.unbind(this.collection, 'destroy');
			}

			this.collection = collection;
			this.listenTo(this.collection, 'change', this.render);
			this.listenTo(this.collection, 'destroy', this.remove);
		},

		events: {
			'submit #add-website': 'submitWebsite'
		},

		formCheck: {
			name: function() {
				console.log($('#add-website input["name"]').val());
			},
			url: function() {
				console.log($('#add-website input["url"]').val());
			}
		},

		submitWebsite: function(evt) {
			console.log('Submit event on #add-website form');
			_.each(this.addWebsiteForm.fields, function(field) {
				formCheck(this.formCheck[field]());
			});
			evt.preventDefault();
		},

		addWebsiteForm: {
			fields : ['name','url']
		}

	});
})();