var mongoose = require('mongoose');

var Schema = mongoose.Schema;


var WebsiteZone = new Schema({
    name: {type: String},
    options: {
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
       deleted: { type: Boolean, default: false},
        suspended: {type: Boolean, default: false},
        validated : { type : Boolean, default: false }
    },
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
    },
});

WebsiteModel = mongoose.model('websites', Website);