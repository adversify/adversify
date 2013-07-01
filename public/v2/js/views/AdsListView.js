define([
	'jquery',
	'underscore',
	'backbone',

	'../collections/Ads',

	'text!../../templates/adsList.html',
	'text!../../templates/adListItem.html'
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
			this.collection.fetch();
			this.parentView = options.parentView;
			this.template = _.template(adsListTemplate);
		},

		events: {
			'click .delete-ad-button': 'deleteAd',
			'click .edit-ad-button': 'showEditAdForm',
			'click .close-edit-ad-form': 'hideEditAdForm',
			'click .submit-edit-ad-form': 'submitAdEdit',

			'change .adtype' : 'adTypeHasChanged',
			'click .preview-ad-button' : 'showAdPreview'
		},

		render : function () {
			var self = this;
			this.$el.html(self.template({ads : self.collection.models }));
		},

		addOneAdToDOM : function(model, collection, options) {
			console.log('addOneToDOM @AdListView');
			this.itemTemplate = _.template(adsListItemTemplate);
			this.$("#adsList").append(this.itemTemplate({ad : model}));
		},

		removeOneAdFromDOM : function(model, collection, options) {
			console.log('removeOneFromDOM @AdsListView');
			this.$('#adsList .ad#'+model.id).remove();
		},

		deleteAd: function(evt) {
			var adId = evt.currentTarget.getAttribute('adversify-ad-id');
			var adModel = this.collection.get(adId);
			adModel.destroy();
			this.collection.remove(adModel);
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
			var adId = evt.currentTarget.getAttribute('adversify-ad-id');
			var editAdForm = this.$('.ad#'+adId+' form.edit-ad-form');
			editAdForm.show();
		},

		hideEditAdForm: function(evt) {
			evt.preventDefault();
			var adId = evt.currentTarget.getAttribute('adversify-ad-id');
			var editAdForm = this.$('.ad#'+adId+' form.edit-ad-form');
			editAdForm.hide();
		},


		submitAdEdit: function(evt) {
			evt.preventDefault();
			var self = this;
			var adId = evt.currentTarget.getAttribute('adversify-ad-id');
			var adModel = this.collection.get(adId);
			var editAdForm = this.$('.ad#'+adId+' form.edit-ad-form');
			var editAdFormSerialized = editAdForm.serializeArray();
			var editAdFormRaw = {};
			for(var i=0; i < editAdFormSerialized.length; i++) {
				editAdFormRaw[editAdFormSerialized[i].name] = editAdFormSerialized[i].value;
			}
			var adHash = {
				infos: {
					name: editAdFormRaw['name'],
					description: editAdFormRaw['description']
				},
				design: {
					dimensions: editAdFormRaw['ad.dimensions']
				},
				adOptions: {
					remuneration: editAdFormRaw['ad.remuneration'],
					type: editAdFormRaw['ad.type']
				},
				content: {
					title: editAdFormRaw['content.title'],
					text: editAdFormRaw['content.text']
				},
				targets: {
					link: editAdFormRaw['targets.link'],
					social: {
						twitter: editAdFormRaw['targets.social.twitter'],
						youtube: editAdFormRaw['targets.social.youtube'],
						flickr: editAdFormRaw['targets.social.flickr'],
						hashtag: editAdFormRaw['targets.social.hashtag'],
						facebook: editAdFormRaw['targets.social.facebook']
					}
				}
			};
			adModel.save(adHash, {
				success: function(model, response, options) {
					console.log("SUCCESS EDIT AD");
				},
				error : function(model, xhr, options) {
					alert("Unable to save your modifications on this ad ("+adModel.id+")");
				}
			});
		},

		adTypeHasChanged: function(evt) {
			var self = this;
			var target = evt.currentTarget;
			var adId = target.getAttribute('adversify-ad-id');
			var methodMap = {};
			var imageAdFieldset = this.$('.ad#'+adId+' form.edit-ad-form .image-ad-fieldset');
			var textAdFieldset = this.$('.ad#'+adId+' form.edit-ad-form .text-ad-fieldset');
			methodMap['text'] = function() {
				imageAdFieldset.hide();
				textAdFieldset.show();
			};
			methodMap['image'] = function() {
				textAdFieldset.hide();
				imageAdFieldset.show();
			};
			var editAdForm = this.$('.ad#'+adId+' form.edit-ad-form');
			var editAdFormRaw = {};
			var editAdFormSerialized = editAdForm.serializeArray();
			for(var i=0; i < editAdFormSerialized.length; i++) {
				editAdFormRaw[editAdFormSerialized[i].name] = editAdFormSerialized[i].value;
			}
			methodMap[editAdFormRaw['ad.type']]();
		},

		showAdPreview: function(evt) {
			evt.preventDefault();
			var target = evt.currentTarget;
			var adId = target.getAttribute('adversify-ad-id');
			var adPreviewContainer = this.$('.ad#'+adId+' .ad-preview-container');
			var adModel = this.collection.get(zoneId);
			this.buildAdPreview(adModel);
			adPreviewContainer.show();
		},

		buildAdPreview: function(adModel) {
			return true;
		},


		title: 'Ads List'

	});
});