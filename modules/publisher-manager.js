var mongoose = require('mongoose'),
AM = require('../modules/account-manager.js'),
PasswordsUtil = require('../modules/utils/passwords.js');


var PM = {};

PM.register = function(publisherHash, ipInfos, callback) {
	var self = this;
	publisherHash.ip = ipInfos;
	console.log(publisherHash);
	self.registerCheck(publisherHash, function(err, checkedPublisherHash) {
		if(err || !checkedPublisherHash) {
			callback(err && err.message ? err.message : 'invalid-data');
		} else {
			var checkedPublisher = new PublisherModel(checkedPublisherHash);
			PasswordsUtil.saltAndHash(checkedPublisher.password, function(error, hashedPassword) {
				if(error || !hashedPassword) {
					callback('something-went-wrong');
				} else {
					checkedPublisher.password = hashedPassword;
					checkedPublisher.save(function(err, savedPublisher) {
						if(err || !savedPublisher) {
							callback(err ? err : 'something-went-wrong');
						} else {
							callback(null, savedPublisher);
						}
					});
				}
			});
		}
	});
};

PM.registerCheck = function(publisher, callback) {
	if(publisher.password !== publisher.password) {
		callback('passwords-do-not-match');
	} else callback(null, publisher);
};

module.exports = PM;

PM.updateAccount = AM.updatePublisher;

PM.autoLogin = AM.autoLoginPublisher;

PM.login = AM.loginPublisher;

PM.get = AM.getPublisher;

PM.getProfile = AM.getPublisherProfile;

PM.setPassword = PM.setPassword;
