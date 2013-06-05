/* This module is so not ready for production!*/
/* e -> error
/* o -> object

*/
var mongoose = require('mongoose');
var AM = require('../modules/account-manager.js');
var PasswordsUtil = require('../modules/utils/passwords.js');


var AdM = {};

module.exports = AdM;


AdM.register = function(advertiserHash, ipInfos, callback) {
  var self = this;
  advertiserHash.ip = ipInfos;
  self.registerCheck(advertiserHash, function(err, checkedAdvertiserHash) {
    if(err || !checkedAdvertiserHash) {
      callback(err && err.message ? err.message : 'invalid-data');
    } else {
      var checkedAdvertiser = new AdvertiserModel(checkedAdvertiserHash);
      PasswordsUtil.saltAndHash(checkedAdvertiser.password, function(error, hashedPassword) {
        if(error || !hashedPassword) {
          callback('something-went-wrong');
        } else {
          checkedAdvertiser.password = hashedPassword;
          checkedAdvertiser.save(function(err, savedAdvertiser) {
            if(err || !savedAdvertiser) {
              console.log('Unable to save user', err);
              callback(err ? err : 'something-went-wrong');
            } else {
              callback(null, savedAdvertiser);
            }
          });
        }
      });
    }
  });
};

AdM.registerCheck = function(advertiser, callback) {
  if(advertiser.password !== advertiser.password) {
    callback('passwords-do-not-match');
  } else callback(null, advertiser);
};


AdM.addAd = function(u,newData,callback) {
    var a = new AdModel({
      "name":newData.adname,
      "category":newData.adcategory,
      "description":newData.addescription,
      "url":newData.siteurl,
      "created":Date.now()
    });
    a.save(function(e,o){
      if(!e) {
        AdvertiserModel.findOneAndUpdate(
          { username:u },
          { $push: { ads: o }},
          { safe: true, upsert: true },
          function(e, o) {
            if(e) {
              callback(e);
            } else {
              callback(null,o);
            }
        });
      } else {
        callback(e);
      }
    });


      //http://stackoverflow.com/questions/13412579/node-express-mongoose-sub-collection-document-insert?rq=1
};

AdM.getAds = function(u,nb,sort,callback) {
  AdvertiserModel.findOne({username:u}, function(e,o) {
    if(!e) {
      callback(null,o.ads);
    } else {
      callback(e);
    }
  });
};

AdM.addAd = function(u,newData,callback) {
      console.log(newData);
    var a = new AdModel({
      "name":newData.name,
      "category":newData.category,
      "description":newData.description,
      "url":newData.url,
      "created":Date.now()
    });
    a.save(function(e,o){
      if(!e) {
        AdvertiserModel.findOneAndUpdate(
          { username:u },
          { $push: { ads: o }},
          { safe: true, upsert: true },
          function(e, o) {
            if(e) {
              callback(e);
            } else {
              callback(null,o);
            }
        }); 
      } else {
        callback(e);
      }
    });


}

AdM.updateAccount = AM.updateAdvertiser;

AdM.autoLogin = AM.autoLoginAdvertiser;

AdM.login = AM.loginAdvertiser;

AdM.get = AM.getAdvertiser;