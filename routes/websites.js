var WM = require('../modules/website-manager.js');

exports.getListOfWebsites = function(req,res) {
  console.log("Publisher attempt to get all his websites");
  /*if(!req.session.user || req.session.user.kind != "publisher") {
    res.redirect("/");
  } else {*/
    WM.getListOfWebsites(req.session.user.id ? req.session.user.id : '5165B701457264A995000001', null, null, function(e,o) {
      if(!o || e) {
        if(!e) {
          e = new Error('Unable to get the list of websites');
        }
        res.send(e, 400);
      }
      else {
        res.send(o, 200);
      }
    });
 // }
};

exports.default = function(req, res) {
  if(req.session.user.kind != 'publisher') {
    res.redirect("/");
  } else {
    res.send(200, "OK");
  }
};

exports.deleteWebsite = function(req,res) {
 /* if(req.session.user.kind != "publisher") {
    res.redirect("/");
  } else { */
    console.log("@deleteWebsite", req.param('id'));
    WM.deleteWebsite(req.session.user.id || '5165B701457264A995000001',req.param('id'),function(e,websiteWasDeleted){
      if(e || !websiteWasDeleted) {
        if(!e) {
          e = new Error('Unable to delete website');
        }
        res.send(e, 400);
      } else if(websiteWasDeleted) {
        res.send("OK", 200);
      }
    });
  //}
};

exports.getWebsite = function(req, res){
  if(req.session.user.kind != "publisher") {
    res.redirect("/");
  } else {
    WM.getWebsite(req.param('id'),function(e,fetchedWebsite){
      if(!fetchedWebsite || e) {
        if(!e) {
          e = new Error('Unable to get website');
        }
        res.send(e, 400);
      } else {
        res.send(fetchedWebsite, 200);
      }
    });
  }
};

exports.createWebsite = function(req,res) {
   WM.addWebsite(req.session.user.id || '5165B701457264A995000001',req.body,function(e,createdWebsite) {
      if(e) {
        res.send(e, 400);
      }
      else {
        res.send(createdWebsite, 200);
      }
    });
};

exports.updateWebsite = function(req, res) {
  WM.updateWebsite(req.session.user.id || '5165B701457264A995000001',req.param('id'),req.body,function(e,updatedWebsite) {
    if(!updatedWebsite || e) {
      if(!e) {
        e = new Error('Unable to update website');
      }
        res.send(e, 400);
    }
    else {
      res.send(updatedWebsite, 200);
    }
  });
};