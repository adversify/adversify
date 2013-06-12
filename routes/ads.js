var AdsM = require('../modules/ads-manager.js');

exports.getListOfAds = function(req,res) {
  AdsM.getListOfAds(req.session.user ? req.session.user.id : '5165B701457264A995000001', null, null, function(e,o) {
    if(!o || e) {
      if(!e) {
        e = new Error('Unable to get the list of ads');
      }
      res.send(e, 400);
    }
    else {
      res.send(o, 200);
    }
  });
};

exports.createAd = function(req,res) {
   AdsM.newAd(req.session.user ? req.session.user.id : '5165B701457264A995000001',req.body,function(e, newAd) {
      if(e) {
        res.send(e, 400);
      }
      else {
        res.send(newAd, 200);
      }
    });
};