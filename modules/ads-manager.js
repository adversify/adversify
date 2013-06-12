var mongoose = require('mongoose'),
AdModel = require('../schemas/Ads.js'),
_ = require('underscore'),
AdsM = {};

module.exports = AdsM; // Ads Manager module



/*
 * Retrieve advertisers list of ads
 * @function
 * @param {String} uId userId from session
 * @param {String} nb number of results to fetch
 * @param {String} sort criteria, 'asc' or 'des'
 * @param {Function} callback(err, result) function that is used to give back results or error
*/


AdsM.getListOfAds = function(uId,nb,sort,callback) {
	AdModel.find({owner: uId}, function(err, fetchedWebsites) {
		if(err || !fetchedWebsites) {
			if(!err) {
				err = new Error('Unable to retrieve your websites');
			}
			callback(err);
		} else {
			callback(null,fetchedWebsites);
		}
	});
};

/*
 * Update a single ad
 * @function
 * @param {String} uId userId from session
 * @param {String} adId _id of the targeted ad
 * @param [{String}] newData ad data to be updated via POST or PUT request 
 * @param {Function} callback(err,result) function that is used to give back results or error
*/

AdsM.updateAd = function(uId, adId, newData, callback) {
	newData = _.omit(newData, '_id');
	console.log(newData.options ? newData.options.services : newData);
	console.log("--- ENd of new datya");
	WebsiteModel.findOneAndUpdate({_id : websiteId, owner: uId},newData, function(err, updatedWebsite) {
		if(err || !updatedWebsite) {
			callback(err ? err : 'Unable to update this website.');
		} else {
			callback(null, updatedWebsite);
		}
	});
};

/*
 * Retrieve single ad
 * @function
 * @param {String} uId userId from session
 * @param {String} adId ad id of the targeted website
 * @param {Function} callback function that is used to give back results
*/

AdsM.getAd = function(uId, adId, callback) {
	WebsiteModel.findOne({owner: uId, _id: wId}, function(err, fetchedWebsite) {
		if(err || !fetchedWebsite) {
			callback(err ? err : 'Unable to find this website');
		} else {
			callback(null, fetchedWebsite);
		}
	});
};


/*
 * Deletes single ad
 * @function
 * @param {String} uId userId from session
 * @param {String} adId adId of the targeted ad
 * @param {Function} callback(err, result) function that is used to give back results
*/

AdsM.deleteAd = function(uId, adId, callback) {
	WebsiteModel.findOneAndRemove({_id : wId, owner: uId}, function(err, website) {
		if(err || !website) {
			callback(err ? err : 'Unable to find website');
		} else {
			callback(null,'OK');
		}
	});

};


/*
 * Create an ad
 * @function
 * @param {String} uId userId from session
 * @param [{String}] newData : POST data to create an ad
 * @param {Function} callback(err, result) function that is used to give back results
*/

AdsM.newAd = function(uId,newData,callback) {
	var newAd = new AdModel({
		'infos' : {
			'name': newData.infos.name
		},
		'created':Date.now(),
		'owner': uId
	});
	newAd.save(function(err) {
		if(err) {
			callback(err);
		} else {
			callback(null, newAd);
		}
	});
};