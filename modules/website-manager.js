var mongoose = require('mongoose'),
ZM = require('../modules/zone-manager.js'),
WM = {};

module.exports = WM; // WEBSITE MANAGER MODULE

/*
 * Retrieve publishers websites list
 * @function
 * @param {String} uId userId from session
 * @param {String} nb number of results to fetch
 * @param {String} sort sort criteria, 'ascending' or 'descending'
 * @param {Function} callback(err, result) function that is used to give back results or error
*/


WM.getWebsites = function(uId,nb,sort,callback) {
	var websiteIds = [];

	PublisherModel.findOne({_id:uId}, function(e,publisher) {
		if(!publisher || e) {
			websiteIds = publishers.websites;
			WebsiteModel.find({_id:{$in: websiteIds}}, function(e, fetchedWebsites) {
				if(e || !fetchedWebsites || !fetchedWebsites.length) {
					callback(e);
				} else {
					callback(null, fetchedWebsites);
				}
			});

		} else {
			callback(e);
		}
	});
};

/*
 * Update a single website
 * @function
 * @param {String} uId userId from session
 * @param {String} websiteId _id of the targeted website
 * @param [{String}] newData website data to be updated via POST or PUT request 
 * @param {Function} callback(err,result) function that is used to give back results or error
*/

WM.updateWebsite = function(uId, websiteId, newData, callback) {
	PublisherModel.findOne({_id:uId}, function(e, publisher) {
		if(e || !publisher) {
			callback(e);
		} else {
			WebsiteModel.findOne({_id:websiteId}, function(e, updatedWebsite) {
				if(e || !updatedWebsite) {
					callback(e);
				} else {
					callback(null, updatedWebsite);
				}
			});
		}
	});
};

/*
 * Retrieve single website
 * @function
 * @param {String} uId userId from session
 * @param {String} wId websiteId of the website
 * @param {Function} callback function that is used to give back results
*/

WM.getWebsite = function(uId, wId, callback) {
	PublisherModel.findOne({_id: uId, websites: { '$in' : [wId] }}, function(e, publisher) {
		if(e || !publisher) {
			callback(e);
		} else {
			WebsiteModel.findOne({_id:wId}, function(e,o) {
				if(o) {
					callback(null,o);
				} else {
					callback(e);
				}
			});
		}
	});
};


/*
 * Deletes single website
 * @function
 * @param {String} uId userId from session
 * @param {String} wId websiteId of the website
 * @param {Function} callback(err, result) function that is used to give back results
*/

WM.deleteWebsite = function(uId, wId, callback) {

	ZM.deleteZonesByWebsite(uId, nId, function(e, deletedZones) {
		if(e || !deletedZones) {
			callback(e);
		} else {
			WebsiteModel.remove({_id: wId}, function(e) {
				if(e) {
					callback(e);
				} else {
					PublisherModel.findOne({_id: uId}, function(e, publisher) {
						if(e || !publisher) {
							callback(e);
						} else {
							publisher.websites.pop(wId);
							publisher.save();
						}
					});
				}
			});
		}
	});

};

/*
 * Create a website
 * @function
 * @param {String} uId userId from session
 * @param [{String}] newData : POST data to create a website
 * @param {Function} callback(err, result) function that is used to give back results
*/

WM.addWebsite = function(uId,newData,callback) {

	WebsiteModel.findOne({"url":newData.url}, function(e, websiteThatAlreadyExists) {
		if(e || !websiteAlreadyExists) {
			callback(e);
		} else {
			var newWebsite = new WebsiteModel({
				'name': newData.name,
				'category': newData.category,
				'description':newData.description,
				'url':newData.url,
				'created':Date.now()
			});
			newWebsite.save(function(e,savedWebsite) {
				if(e || !savedWebsite) {
					callback(e);
				} else {
					PublisherModel.findOne({'_id': uId}, function(e, publisher) {
						publisher.websites.push(savedWebsite._id);
						publisher.save(function(e) {
							if(e) {
								callback(e);
							} else {
								callback(null, savedWebsite);
							}
						});
					});
				}
			});
		}
	});
};
//http://stackoverflow.com/questions/13412579/node-express-mongoose-sub-collection-document-insert?rq=1