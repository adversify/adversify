define([
	'jquery',
	'underscore',
	'backbone',
	'text!../../templates/websiteListItem.html'
], function(
	$,
	_,
	Backbone,
	websiteListItemTemplate
){	return Backbone.View.extend({
		initialize: function(websitesCollection) {
			this.setCollection(websitesCollection);
			this.template = _.template(websiteListItemTemplate);
		},

		render : function () {
			console.log('rendering with '+this.collection.models.length);
			this.$el.html(this.template({websites : this.collection.models }));
		},

		addOneToDOM : function(model, collection, options) {
			console.log('Adding one websites to the DOM');
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
		// TODO : clean events, don't bind to events that belong to subviews
		events: {
			'click .add-zone-button': 'addZone',
			'click  .edit-zone-button': 'showEditZoneForm',
			'click .submit-edit-zone-form': 'submitZoneEdit',
			'click .delete-zone-button': 'deleteZone',
			'click .close-edit-zone-form': 'hideEditZoneForm'
		},

		title: 'My websites'

	});
});