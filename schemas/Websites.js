var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var WebsiteModel;

var WebsiteZone = new Schema({
    name: {type: String},
    zoneOptions: {
        type: { type : String, enum: ['image','text','*'], default: '*' },
        remuneration: { type: String ,enum: ['cpm', 'cpc', '*'], default: '*' },
        services : {}
    },
    design : {
        textColor: {type : String, default: '#444'},
        borderColor: {type: String, default: '#fff'},
        bgColor: {type:String, default: '#000'},
        titleColor: {type:String,default: '#333'},
        dimensions : { type: String , enum: ['300x233','234x60','125x125','180x150','120x230','200x200','233x233'], default: '300x233'}
    },
    status: {
        deleted: { type: Boolean, default: false },
        suspended: { type: Boolean, default: false },
        validated : { type : Boolean, default: false }
    },
    targets: {
        link : { type : String, match : /((http:\/\/|https:\/\/)?(www.)?(([a-zA-Z0-9-]){2,}\.){1,4}([a-zA-Z]){2,6}(\/([a-zA-Z-_\/\.0-9#:?=&;,]*)?)?)/},
        social: {
            twitter: { type: String },
            hashtag: { type: String },
            youtube: { type: String},
            facebook : { type : String, match : /((http:\/\/|https:\/\/)?(www.)?(([a-zA-Z0-9-]){2,}\.){1,4}([a-zA-Z]){2,6}(\/([a-zA-Z-_\/\.0-9#:?=&;,]*)?)?)/}
        }
    },
    content: {
        text: { type: String },
        title: { type: String },
        image: {}
    }
});

var Website = new Schema({
    owner: {type: String},
    infos: {
        name: { type: String, required: true },
        url : { type : String, match : /((http:\/\/|https:\/\/)?(www.)?(([a-zA-Z0-9-]){2,}\.){1,4}([a-zA-Z]){2,6}(\/([a-zA-Z-_\/\.0-9#:?=&;,]*)?)?)/, required: true, unique: true}
    },
    zones: [WebsiteZone],
    status: {
       deleted: { type: Boolean, default: false},
        suspended: {type: Boolean, default: false},
        validated : { type : Boolean, default: false }
    }
});

module.exports = WebsiteModel = mongoose.model('websites', Website);