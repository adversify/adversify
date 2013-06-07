var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var PublisherModel;

var Publisher = new Schema({
    username: { type: String, required: true, match: /^[a-zA-Z0-9-_]+$/, unique: true },  
    password: { type: String, required: true},
    modified: { type: Date, default: Date.now },
    joined: {type: Date, default:Date.now},
    infos : {
        streetadress: { type: String },
        city: { type: String },
        country: { type: String },
        phone: { type: String },
        email: { type: String, unique: true, match : /[a-z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}/, required: true }
    },
    status: {
        deleted: { type: Boolean, default: false},
        suspended: {type: Boolean, default: false},
        validated : { type : Boolean, default: false }
    },
});

module.exports = PublisherModel = mongoose.model('publishers', Publisher);
