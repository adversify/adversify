define([
	'jquery',
	'underscore',
	'backbone',

	'../models/Website',
	'../collections/Websites',

	'text!../../templates/websitesList.html',
	'text!../../templates/websiteListItem.html',
	'text!../../templates/zoneListItem.html'
], function(
	$,
	_,
	Backbone,

	WebsiteModel,
	WebsiteCollection,

	websitesListTemplate,
	websiteListItemTemplate,
	zoneListItemTemplate
){	return Backbone.View.extend({
		initialize: function(options) {
			console.log('Init WebsitesListView');
			this.setCollection(new WebsiteCollection());
			this.collection.fetch();
			this.parentView = options.parentView;
			this.template = _.template(websitesListTemplate);
		},

		events: {
			'click .delete-website-button': 'deleteWebsite',
			'click .edit-website-button': 'showEditWebsiteForm',
			'click .close-edit-website-form': 'hideEditWebsiteForm',
			'click .submit-edit-website-form': 'submitWebsiteEdit',

			'change .js-zone-fallback' : 'toggleZoneFallback',
			'change .zonetype' : 'zoneTypeHasChanged',
			'change .bordercolorpicker' : 'handleBordercolorInput',
			'change .backgroundcolorpicker' : 'handleBackgroundcolorInput',
			'change .contentcolorpicker' : 'handleContentcolorInput',
			'change .zonedimensions' : 'zoneDimensionsHaveChanged',

			'click .add-zone-button' : 'showAddZoneForm',
			'click .close-add-zone-form' : 'hideAddZoneForm',
			'click .submit-add-zone-form' : 'submitZoneAdd',
			'click .preview-zone-button' : 'showZonePreview',

			'click .delete-zone-button': 'deleteZone',
			'click .edit-zone-button': 'showEditZoneForm',
			'click .submit-edit-zone-form': 'submitZoneEdit',
			'click .close-edit-zone-form' : 'hideEditZoneForm'
		},

		render : function () {
			this.$el.html(this.template({websites : this.collection.models }));
		},

		addOneWebsiteToDOM : function(model, collection, options) {
			console.log('addOneToDOM @WebsitesListView');
			this.itemTemplate = _.template(websiteListItemTemplate);
			this.$el.find("#websitesList").append(this.itemTemplate({website : model}));
		},

		removeOneWebsiteFromDOM : function(model, collection, options) {
			console.log('removeOneFromDOM @WebsitesListView');
			this.$el.find('#websitesList .website#'+model.id).remove();
		},

		addOneZoneToDOM : function(model, collection, options) {
			console.log('addOneZoneToDOM @WebsitesListView');
			var zoneItemTemplate = _.template(zoneListItemTemplate);
			this.$el.find("#websitesList .website#"+model.get('website')+" ul").append(zoneItemTemplate({zone : model}));
		},

		removeOneZoneFromDOM : function(model,collection,options) {
			console.log('removeOneFromDOM @WebsitesListView');
			this.$el.find('#websitesList .website #'+model.id).remove();
		},

		setZoneCollection : function(model, zoneCollection) {
			model.set({zones : zoneCollection}, {silent: true});
			this.listenTo(zoneCollection, 'add', this.addOneZoneToDOM);
			this.listenTo(zoneCollection, 'change', this.zoneChanged);
			this.listenTo(zoneCollection, 'remove', this.removeOneZoneFromDOM);
		},

		setCollection : function(collection) {
			this.collection = collection;
			this.listenTo(this.collection, 'reset', this.render);
			this.listenTo(this.collection, 'change', this.render);
			this.listenTo(this.collection, 'add', this.addOneWebsiteToDOM);
			this.listenTo(this.collection, 'remove', this.removeOneWebsiteFromDOM);
		},

		deleteWebsite: function(evt) {
			var websiteId = evt.currentTarget.getAttribute('adversify-id');
			var websiteModel = this.collection.get(websiteId);
			websiteModel.destroy();
			this.collection.remove(websiteModel);
			console.log('@deleteWebsite FROM WebsitesListView');
		},

		submitWebsiteEdit: function(evt) {
			evt.preventDefault();
			var self = this;
			var websiteId = evt.currentTarget.getAttribute('adversify-id');
			var websiteModel = this.collection.get(websiteId);
			var editWebsiteForm = this.$('li#'+websiteId+' form.edit-website-form')[0];
			var websiteHash = {
				infos: {
					'name' : editWebsiteForm['name'].value,
					'url' : editWebsiteForm['url'].value
				}
			};
			websiteModel.save(websiteHash, {
				success: function(model, response, options) {
					console.log("SUCCESS EDIT WEBSITE");
				},
				error : function(model, xhr, options) {
					alert("Unable to save your modifications on this website");
				}
			});
		},

		showAddZoneForm: function(evt) {
			evt.preventDefault();
			var websiteId = evt.currentTarget.getAttribute('adversify-id');
			var websiteModel = this.collection.get(websiteId);
			var addZoneForm = this.$el.find('li#'+websiteId+' form.add-zone-form');
			addZoneForm.show();
		},

		hideAddZoneForm: function(evt) {
			evt.preventDefault();
			var websiteId = evt.currentTarget.getAttribute('adversify-id');
			var websiteModel = this.collection.get(websiteId);
			var addZoneForm = this.$el.find('li#'+websiteId+' form.add-zone-form');
			addZoneForm.hide();
		},

		submitZoneAdd: function(evt) {
			evt.preventDefault();
			var self = this;
			var websiteId = evt.currentTarget.getAttribute('adversify-id');
			var websiteModel = this.collection.get(websiteId);
			var addZoneForm = this.$el.find('li#'+websiteId+' form.add-zone-form')[0];
			var zoneHash = {
				name : addZoneForm['name'].value,
				design: {},
				options: {}
			};
			this.setZoneCollection(websiteModel, websiteModel.zoneListToCollection());
				websiteModel.get('zones').add(zoneHash);
				websiteModel.set({'zones':websiteModel.get('zones').models}, {silent:true});
				websiteModel.save(null, {
					success: function(model, response, options) {
						self.$el.find(".website#"+model.get('website')+" ul li#"+model.cid).attr('id',model.id);
					},
					error: function() {
						alert('Could not save zone ...');
					}
				});
		},

		deleteZone: function(evt) {
			evt.preventDefault();
			var zoneId = evt.currentTarget.getAttribute('adversify-id');
			var websiteId = this.$el.find('li#'+zoneId).closest('.website').attr('id');
			var websiteModel = this.collection.get(websiteId);
			this.setZoneCollection(websiteModel, websiteModel.zoneListToCollection());
			websiteModel.get('zones').remove(websiteModel.get('zones').get(zoneId));
			websiteModel.set({'zones':websiteModel.get('zones').models}, {silent:true});
			websiteModel.save();
			console.log('@EndOfDeleteZone');
		},

		submitZoneEdit: function(evt) {
			evt.preventDefault();
			var zoneId = evt.currentTarget.getAttribute('adversify-id');
			var websiteId = this.$el.find('li#'+zoneId).closest('.website').attr('id');
			var editZoneForm = this.$el.find('li#'+zoneId+' form.edit-zone-form')[0];
			console.log('Submit zone edit with services');
			var zoneHash = {
				'name' : editZoneForm['name'].value,
				'design': {
					'dimensions' : editZoneForm['design.dimensions'].value
				}, 'options': {
					'type' : editZoneForm['options.type'].value,
					'remuneration': editZoneForm['options.remuneration'].value,
					'services' : {
						'adblockFallback' : {
							'enabled' : true
						},
						'googleAnalytics' : {
							'enabled' : true
						},
						'crawling' : {
							'enabled' : true
						},
						'social' : {
							'enabled' : true,
							'facebook' : {
								'enabled' : true
							},
							'twitter' : {
								'enabled' : true
							}
						},
						'doNotTrackUs' : {
							'enabled' : true
						},
						'acceptableAds' : {
							'enabled' : true
						}
					}
				}
			};

			var websiteModel = this.collection.get(websiteId);
			this.setZoneCollection(websiteModel, websiteModel.zoneListToCollection());
			var zoneModel = websiteModel.get('zones').get(zoneId);
			zoneModel.set(zoneHash);
			websiteModel.set('zones' , websiteModel.zoneCollectionToList());
			websiteModel.save(null, {
				success: function() {
					this.$('li#'+zoneId+' form.edit-zone-form').hide();
				},
				error: function() {
					alert("Unable to save your modifications.");
				}
			});
		},

		showEditZoneForm: function(evt) {
			var htmlEl = evt.currentTarget;
			var zoneId = htmlEl.getAttribute('adversify-id');
			var editZoneForm = this.$el.find('li#'+zoneId+' form.edit-zone-form');
			editZoneForm.show();
			evt.preventDefault();
		},

		hideEditZoneForm: function(evt) {
			var htmlEl = evt.currentTarget;
			var zoneId = htmlEl.getAttribute('adversify-id');
			var editZoneForm = this.$el.find('li#'+zoneId+' form.edit-zone-form');
			$(editZoneForm).hide();
			evt.preventDefault();
		},

		showEditWebsiteForm: function(evt) {
			evt.preventDefault();
			var websiteId = evt.currentTarget.getAttribute('adversify-id');
			var editWebsiteForm = this.$('.website#'+websiteId+' form.edit-website-form');
			editWebsiteForm.show();
		},

		hideEditWebsiteForm: function(evt) {
			evt.preventDefault();
			var websiteId = evt.currentTarget.getAttribute('adversify-id');
			var editWebsiteForm = this.$('.website#'+websiteId+' form.edit-website-form');
			editWebsiteForm.hide();
		},

		toggleZoneFallback: function(evt) {
			var target = evt.currentTarget;
			var zoneId = target.getAttribute('zone-id');
			var adProviderScriptInput = this.$('.websiteZone#'+zoneId+' .ad-provider-fieldset');
			if(target.checked) {
				adProviderScriptInput.show();
			} else {
				adProviderScriptInput.hide();
			}
		},

		zoneTypeHasChanged: function(evt) {
			var self = this;
			var target = evt.currentTarget;
			var zoneId = target.getAttribute('adversify-zone-id');
			var websiteId = target.getAttribute('adversify-website-id');
			var methodMap = {};
			var imageZoneFieldset = this.$('.websiteZone#'+zoneId+' form.edit-zone-form .image-zone-fieldset');
			var textZoneFieldset = this.$('.websiteZone#'+zoneId+' form.edit-zone-form .text-zone-fieldset');
			methodMap['text'] = function() {
				imageZoneFieldset.hide();
				textZoneFieldset.show();
			};
			methodMap['image'] = function() {
				textZoneFieldset.hide();
				imageZoneFieldset.show();
			};
			var editZoneForm = this.$('.websiteZone#'+zoneId+' form.edit-zone-form');
			var editZoneFormRaw = {};
			var editZoneFormSerialized = editZoneForm.serializeArray();
			for(var i=0; i < editZoneFormSerialized.length; i++) {
				editZoneFormRaw[editZoneFormSerialized[i].name] = editZoneFormSerialized[i].value;
			}
			var websiteModel = this.collection.get(websiteId);
			this.setZoneCollection(websiteModel, websiteModel.zoneListToCollection());
			var zoneModel = websiteModel.get('zones').get(zoneId);
			var zoneOptions = _.clone(zoneModel.get('zoneOptions'));
			zoneOptions.type = editZoneFormRaw['options.type'];
			zoneModel.set('zoneOptions', zoneOptions);
			methodMap[editZoneFormRaw['options.type']]();
		},

		handleBordercolorInput: function(evt) {
			var borderColorPickerValue = evt.currentTarget.value;
			var zoneId = evt.currentTarget.getAttribute('adversify-zone-id');
			var websiteId = evt.currentTarget.getAttribute('adversify-website-id');
			var colorInput = this.$('.websiteZone#'+zoneId+' .bordercolorinput');
			colorInput.val(borderColorPickerValue);
			this.$('.websiteZone#'+zoneId+' .zone-preview-container .zone-preview').css('borderColor', borderColorPickerValue);
			this.$('.websiteZone#'+zoneId+' .zone-preview-container .zone-preview-live').show();
		},

		handleContentcolorInput: function(evt) {
			var contentColorPickerValue = evt.currentTarget.value;
			var zoneId = evt.currentTarget.getAttribute('adversify-zone-id');
			var websiteId = evt.currentTarget.getAttribute('adversify-website-id');
			var colorInput = this.$('.websiteZone#'+zoneId+' .contentcolorinput');
			colorInput.val(contentColorPickerValue);
			this.$('.websiteZone#'+zoneId+' .zone-preview-container .zone-preview').css('color', contentColorPickerValue);
			this.$('.websiteZone#'+zoneId+' .zone-preview-container .zone-preview-live').show();
		},

		handleBackgroundcolorInput: function(evt) {
			var backgroundColorPickerValue = evt.currentTarget.value;
			var zoneId = evt.currentTarget.getAttribute('adversify-zone-id');
			var websiteId = evt.currentTarget.getAttribute('adversify-website-id');
			var colorInput = this.$('.websiteZone#'+zoneId+' .backgroundcolorinput');
			colorInput.val(backgroundColorPickerValue);
			this.$('.websiteZone#'+zoneId+' .zone-preview-container .zone-preview').css('backgroundColor', backgroundColorPickerValue);
			this.$('.websiteZone#'+zoneId+' .zone-preview-container .zone-preview-live').show();
		},

		showZonePreview: function(evt) {
			evt.preventDefault();
			var target = evt.currentTarget;
			var zoneId = target.getAttribute('adversify-zone-id');
			var websiteId = target.getAttribute('adversify-website-id');
			var zonePreviewContainer = this.$('.websiteZone#'+zoneId+' .zone-preview-container');
			var websiteModel = this.collection.get(websiteId);
			this.setZoneCollection(websiteModel, websiteModel.zoneListToCollection());
			var zoneModel = websiteModel.get('zones').get(zoneId);
			this.buildZonePreview(zoneModel);
			zonePreviewContainer.show();
		},

		buildZonePreview: function(zoneModel) {
			var zonePreview = this.$('.websiteZone#'+zoneModel.id+' .zone-preview-container .zone-preview');
			var zoneWidth = 0;
			var zoneHeight = 0;
			var zoneBorderColor = '#000';
			var zoneTitleColor = '#000';
			var zoneTextColor = '#000';
			var zoneBackgroundColor = '#333';

			var dimensionsMap = {'300x233': {}, '234x60': {},"120x230": {}, "233x233": {}, "180x150": {}, "125x125": {}, "200x200": {}};
			dimensionsMap['300x233'].width = 300;
			dimensionsMap['300x233'].height = 233;
			dimensionsMap['234x60'].width = 234;
			dimensionsMap['234x60'].height = 60;
			dimensionsMap['120x230'].width = 120;
			dimensionsMap['120x230'].height = 230;
			dimensionsMap['233x233'].width = 233;
			dimensionsMap['233x233'].height = 233;
			dimensionsMap['125x125'].width = 125;
			dimensionsMap['125x125'].height = 125;
			dimensionsMap['180x150'].width = 180;
			dimensionsMap['180x150'].height = 150;
			dimensionsMap['125x125'].width = 200;
			dimensionsMap['125x125'].height = 200;

			zonePreview.css('width',dimensionsMap[zoneModel.get('design').dimensions].width);
			zonePreview.css('height',dimensionsMap[zoneModel.get('design').dimensions].height);

			zonePreview.css('border-color', zoneModel.get('design').borderColor);
			zonePreview.css('background-color', zoneModel.get('design').backgroundColor);
		},

		zoneDimensionsHaveChanged: function(evt) {
			var target = evt.currentTarget;
			var zoneId = evt.currentTarget.getAttribute('adversify-zone-id');
			var zonePreview = this.$('.websiteZone#'+zoneId+' .zone-preview-container .zone-preview');
			var zoneDimensionsValue = evt.currentTarget.value;
			var dimensionsMap = {'300x233': {}, '234x60': {},"120x230": {}, "233x233": {}, "180x150": {}, "125x125": {}, "200x200": {}};
			dimensionsMap['300x233'].width = 300;
			dimensionsMap['300x233'].height = 233;
			dimensionsMap['125x125'].characterLimit = {
				title:30,
				content:100
			};

			dimensionsMap['234x60'].width = 234;
			dimensionsMap['234x60'].height = 60;
			dimensionsMap['125x125'].characterLimit = {
				title:30,
				content:100
			};

			dimensionsMap['120x230'].width = 120;
			dimensionsMap['120x230'].height = 230;
			dimensionsMap['125x125'].characterLimit = {
				title:30,
				content:100
			};

			dimensionsMap['233x233'].width = 233;
			dimensionsMap['233x233'].height = 233;
			dimensionsMap['125x125'].characterLimit = {
				title:30,
				content:100
			};

			dimensionsMap['125x125'].width = 125;
			dimensionsMap['125x125'].height = 125;
			dimensionsMap['125x125'].characterLimit = {
				title:30,
				content:100
			};

			dimensionsMap['180x150'].width = 180;
			dimensionsMap['180x150'].height = 150;
			dimensionsMap['125x125'].characterLimit = {
				title:30,
				content:100
			};

			dimensionsMap['125x125'].width = 200;
			dimensionsMap['125x125'].height = 200;
			dimensionsMap['125x125'].characterLimit = {
				title:30,
				content:100
			};

			zonePreview.css('width',dimensionsMap[zoneDimensionsValue].width);
			zonePreview.css('height',dimensionsMap[zoneDimensionsValue].height);
			this.$('.websiteZone#'+zoneId+' .zone-preview-container .zone-preview-live').show();
		},


		title: 'My websites',

		editZoneForm : {
			fields: ['zonename', 'zoneremuneration', 'zoneformat', 'zonedimensions']
		}

	});
});