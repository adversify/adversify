var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var Advertiser = new Schema({
    username: { type: String, required: true, match: /^[a-zA-Z0-9-_]+$/, unique: true },  
    password: { type: String, required: true},
    salt: { type: String, required: true},
    email: { type: String, unique: true, match : /[a-z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}/,required: true },
    modified: { type: Date, default: Date.now },
    joined: {type: Date},
    streetadress: { type: String },
    city: { type: String },
    country: { type: String },
    phone: { type: String},
    ads: [{ type: String }]
});

AdvertiserModel = mongoose.model('advertisers', Advertiser);
