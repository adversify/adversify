var ZM = require('../modules/zone-manager.js');

exports.default = function(req, res){
   if(!req.session.user || req.session.user.kind != "publisher") {
    res.redirect("/");
  } else {
    ZM.getZones(req.session.user.id, function(e,fetchedZones) {
      if(!o || e || !fetchedZones.length) {
      res.send(400, "no-zones-found");
    } else if(!o){
      res.send(200, fetchedZones);
    }
   });
  }
};

exports.createZone = function(req, res) {
  console.log(req.session.user);
   if(!req.session.user || req.session.user.kind != "publisher") {
    res.redirect("/");
  } else {
    ZM.addZone(req.session.user.id,req.body, function(e, createdZone) {
      if(!createdZone || e) {
        res.send(400, e);
      } else {
        res.send(200,createdZone);
      }
   });
  }};
