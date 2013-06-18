var AdM = require('../modules/advertiser-manager.js');


exports.index = function(req, res){
  if(req.cookies.username == undefined || req.cookies.password == undefined){
    res.render('login-advertiser.html', { title: 'Login to your Advertiser account.' });
  } else {
    AdM.autoLogin(req.cookies.username, req.cookies.password, function(o){
      if (o != null){
        req.session.username = o.username;
        req.session.kind = "advertiser";
        res.redirect('/advertiser/default');
      } else{
        res.render('login-advertiser.html', { title: 'Login to your Advertiser account.' });
      }
    });
  }
};

exports.register = function(req,res){
  var ipInfos = req.header('x-forwarded-for') ? {proxy : true, value : req.header('x-forwarded-for')} : {value : req.connection.remoteAddress};

  AdM.register(req.body, ipInfos, function(e,o) {
    if(e || !o) {
      if(e)
      res.send(e, 400);
    } else {
      res.send(o, 200);
    }
  });
};

exports.login = function(req, res){
  AdM.login(req.param('login'),req.param('password'), function(e,o) {
      if (e || !o) {
        if(!o) {
          e = new Error('Could not retrieve your account.');
        }
        res.send(e, 400);
      } else {
        req.session.user = {name: o.username, password: o.password, kind: 'advertiser', id:o._id};
        if (req.param('remember-me') == 'on') {
          res.cookie('username', o.username);
          res.cookie('password', o.password);
        }
        res.send(o, 200);
      }
  });
};

exports.default = function(req,res) {
  if(req.session.kind != "advertiser") {
    res.redirect("/");
  } else {
    res.render('advertiser-default.html', { title: 'Advertiser'});
  }
}

exports.createAd = function(req,res) {
  console.log("Advertiser attempt to create Website :");
  if(req.session.kind != "advertiser") {
    res.redirect("/");
  } else {
        AdM.addAd(req.session.username,req.body,function(e,o) {
      if(!o) {
          res.send(e, 400);
      }
      else {
        res.send(o, 200);
      }
    });
  }
}

exports.getWebsites = function(req,res) {
  console.log("Advertiser attempt to get single website");
  if(req.session.kind != "advertiser") {
    res.redirect("/");
  } else {
        AdM.getWebsites(req.session.username,null,null,function(e,o) {
          if(!o) {
              res.send(e, 400);
          }
          else {
            res.send(o, 200);
          }
        });
  }
}

exports.profile = function(req,res) {
    if(req.session.kind != "advertiser") {
    res.redirect("/");
  } else {
    res.render('advertiser-profile.html', { title: 'Publisher Profile'});
  }
}

exports.updateProfile = function(req,res) {
    if(req.session.kind != "advertiser") {
    res.redirect("/");
  } else 
        AdM.updateAccount(req.body,function(e,o) {
          if(!o) {
              res.send(e, 400);
          }
          else {
            res.send(o, 200);
          }
        });
  }