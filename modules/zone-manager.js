var mongoose = require('mongoose'),
WM = require('../modules/website-manager.js'),
ZM = {};

module.exports = ZM;


ZM.addZone = function(u,newData,callback) {
		var z = new ZoneModel({
			"name":newData.name,
			"created":Date.now(),
			"dimensions":newData.dimensions,
			"format":newData.format,
			"remuneration":newData.remuneration,
			"kind":newData.kind,
			"author":u.id
		});

		z.save(function(e,zone) {
			if(e || !zone) {
				if(!e) {
					e = new Error('Unable to add zone');
				}
				callback(e);
			} else {
				PublisherModel.findOneAndUpdate(
					{ _id: u.id },
					{ $push: { zones: zone._id }},
					function(err, publisher) {
						if(err || !publisher) {
							if(!err) {
								err = new Error('Unable to find your publisher account');
							}
							callback(err);
						} else {
							WebsiteModel.findOneAndUpdate(
								{_id: newData.websiteId},
								{ $push: { zones: zone._id }},
								function(error, website) {
									if(error || !website) {
										if(!error) {
											error = new Error('Unable to find the corresponding website');
										}
										callback(error);
									} else {
										callback(null,zone);
									}
								}
							);
						}
					}
				);
			}
		});
};

ZM.deleteZonesByWebsite = function(uId,wId,callback) { // Deletes all zones inside a website
	var ids = [],
	tempZones = [];

	PublisherModel.findOne({_id:uId, "websites._id":wId}, function(e,o) {
		if(o) {
			WebsiteModel.findOne({_id:wId}, function(e,o) {
				tempZones = o.zones;
				o.zones = undefined;
				o.save(function(e) {
					if(e) {
						callback(e);
					} else {
						for(var i=0;i < tempZones.length; i++) {
							ids.push(tempZones[i]._id);
						}
						ZoneModel.find({_id:{$in: ids}}, function(e,o) {
							console.log(o);
							if(e) {
								callback(e);
							} else {
								callback(null,"OK");
							}
						});

					}
				});
			});
		} else {
			callback(e);
		}
	});
};


ZM.deleteZone = function(u,zId,callback) {
	// TO DO : function check user owns this particual zone and website
	WebsiteModel.findOne({"zones._id":nId},
		function(e,o) {
			if(e) {
				callback(e);
			} else {
				o.zones.id(nId).remove();
				o.save(function (e,o) {
						if(e) {
							callback(e);
						} else {
							callback(null,"OK");
						}
				});
			}
	});
};

ZM.getZones = function(uId,callback) { // Having to write so much code for such a simple thing is driving me insane
	var w = [],z = [],zoneIds = [], websiteIds = [];

	ZoneModel.find({owner:uId},function(err, zones) {
		if(err || !zones) {
			var err = new Error('Unable to retrieve your zones.');
			callback(err);
		} else {
			callback(null,zones);
		}
	});

	PublisherModel.findOne({_id:uId},function(e,o) {
		if(o) {
			w = o.websites;
			for(var i=0;i < w.length; i++) {
				websiteIds.push(w[i]._id);
			}
			WebsiteModel.find({_id:{$in: websiteIds}}, function(e,o) {
				if(e) {
					callback(e);
				} else if(o) {
					for(var y=0;y < o.length; y++) { // BHOUUU DOUBLE BOUCLE
						for(var x=0; x < o[y].zones.length; x++) {
							zoneIds.push(o[y].zones[x]._id);
						}
					}
					ZoneModel.find({_id:{$in:zoneIds}}, function(e,o) {
						if(e) {
							callback(e);
						} else if(o) {
							callback(null,o);
						} else {
							callback("no-zones-found-"+zoneIds);
						}
					});
				} else {
					callback("no-websites-found-"+websiteIds);
				}
			});
		}
	});
};