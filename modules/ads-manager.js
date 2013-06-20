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
	AdModel.findOneAndRemove({_id : adId, owner: uId}, function(err, adWasDeleted) {
		if(err || !adWasDeleted) {
			callback(err ? err : 'Unable to delete ad.');
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


/*
 * Update an ad
 * @function
 * @param {String} uId userId from session
 * @param {String} adId ID of the targeted Ad
 * @param [{String}] newData : data hash containing updated ad
 * @param {Function} callback(err, result) function that is used to give back results
*/

AdsM.updateAd = function(uId,adId,newData,callback) {
	newData = _.omit(newData, '_id');
	AdModel.findOneAndUpdate({_id : adId, owner: uId},newData, function(err, updatedAd) {
		if(err || !updatedAd) {
			callback(err ? err : 'Unable to update this ad.');
		} else {
			callback(null, updatedAd);
		}
	});
};