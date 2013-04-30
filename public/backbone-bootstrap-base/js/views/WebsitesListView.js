window.adversify.views.WebsitesListView = (function() {
	return Backbone.View.extend({
		initialize: function(websitesCollection) {
			console.log('Init WebsitesListView');
			this.setCollection(websitesCollection);
			this.template = _.template(this.getTemplate("websitesList"));
		},

		events: {
			'click .delete-website-button': 'deleteWebsite',
			'click .edit-website-button': 'editWebsite'
		},

		render : function () {
			console.log('rendering with '+this.collection.models.length);
			this.$el.html(this.template({websites : this.collection.models }));
		},

		addOneToDOM : function(model, collection, options) {
			this.itemTemplate = _.template(this.getTemplate("websiteItem"));
			this.$el.find("#websitesList").append(this.itemTemplate({website : model}));
		},

		removeOneFromDOM : function(model, collection, options) {
			this.$el.find('#websitesList .website#'+model.id).remove();
		},

		setCollection : function(collection) {
			this.collection = collection;
			this.listenTo(this.collection, 'reset', this.render);
			this.listenTo(this.collection, 'add', this.addOneToDOM);
			this.listenTo(this.collection, 'remove', this.removeOneFromDOM);
		},

		deleteWebsite: function(evt) {
			var websiteId = evt.currentTarget.getAttribute('adversify-id');
			var websiteModel = this.collection.get(websiteId);
			websiteModel.destroy();
			this.collection.remove(websiteModel);
			console.log('@deleteWebsite FROM WebsitesListView');
		},

		editWebsite: function(evt) {
			console.log('edit website');
		},

		title: 'My websites'

	});
})();