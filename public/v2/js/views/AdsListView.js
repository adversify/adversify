define([
	'jquery',
	'underscore',
	'backbone',

	'../collections/Ads',

	'text!../../templates/adsList.html',
	'text!../../temaplates/adsListItem.html'
], function(
	$,
	_,
	Backbone,

	AdsCollection,

	adsListTemplate,
	adsListItemTemplate
){	return Backbone.View.extend({
		initialize: function(options) {
			console.log('Init AdsListView');
			this.setCollection(new AdsCollection());
			this.parentView = options.parentView;
			this.template = _.template(adsListTemplate);
		},

		events: {
			'click .delete-ad-button': 'deleteAd',
			'click .edit-ad-button': 'showEditAdForm',
			'click .close-edit-ad-form': 'hideEditAdForm',
			'click .submit-edit-ad-form': 'submitAdEdit'
		},

		render : function () {
			this.$el.html(this.template({ads : this.collection.models }));
		},

		addOneAdToDOM : function(model, collection, options) {
			console.log('addOneToDOM @AdListView');
			this.itemTemplate = _.template(adsListItemTemplate);
			this.$("#adsList").append(this.itemTemplate({ad : model}));
		},

		removeOneAdFromDOM : function(model, collection, options) {
			console.log('removeOneFromDOM @AdsListView');
			this.$('#addsList .add#'+model.id).remove();
		},

		deleteAd: function(evt) {
			var websiteId = evt.currentTarget.getAttribute('adversify-ad-id');
			var websiteModel = this.collection.get(adId);
			websiteModel.destroy();
			this.collection.remove(websiteModel);
			console.log('@deleteAd FROM AdsListView');
		},

		setCollection : function(collection) {
			this.collection = collection;
			this.listenTo(this.collection, 'reset', this.render);
			this.listenTo(this.collection, 'change', this.render);
			this.listenTo(this.collection, 'add', this.addOneAdToDOM);
			this.listenTo(this.collection, 'remove', this.removeOneAdFromDOM);
		},

		showEditAdForm: function(evt) {
			evt.preventDefault();
			var websiteId = evt.currentTarget.getAttribute('adversify-ad-id');
			var editWebsiteForm = this.$('.website#'+websiteId+' form.edit-ad-form');
			editAdForm.show();
		},

		hideEditAdForm: function(evt) {
			evt.preventDefault();
			var adId = evt.currentTarget.getAttribute('adversify-ad-id');
			var editAdForm = this.$('.website#'+websiteId+' form.edit-ad-form');
			editAdForm.hide();
		},


		submitAdEdit: function(evt) {
			evt.preventDefault();
			var self = this;
			var adId = evt.currentTarget.getAttribute('adversify-ad-id');
			var adModel = this.collection.get(adId);
			var hideEditAdFormForm = this.$('li#'+adId+' form.edit-ad-form')[0];
			var adHash = {
				infos: {
					'name' : editAshForm['name'].value
				}
			};
			AdModel.save(adHash, {
				success: function(model, response, options) {
					console.log("SUCCESS EDIT WEBSITE");
				},
				error : function(model, xhr, options) {
					alert("Unable to save your modifications on this website");
				}
			});
		},

		title: 'Ads List'

	});
});