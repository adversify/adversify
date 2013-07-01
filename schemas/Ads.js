var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var AdModel;

var Ad = new Schema({
    owner: { type: String },
    infos: {
        name: { type: String, required: true, default: 'Ad name' },
        description: { type: String }
    },
    design : {
        dimensions : { type: String , enum: ['300x233','234x60','125x125','180x150','120x230','200x200','233x233'], default: '300x233'}
    },
    adOptions: {
        type: { type : String, enum: ['image','text','*'], default: '*', required: true },
        remuneration: { type: String, enum: ['cpm', 'cpc', '*'], default: '*', required: true },
        budget: {
            dayLimit : { type: Number },
            weekLimit: { type: Number },
            monthLimit: { type: Number },
            total: { type: Number }
        }
    },
    status: {
        deleted: { type: Boolean, default: false},
        suspended: {type: Boolean, default: false},
        validated: { type : Boolean, default: false }
    },
    content : {
        title: { type : String },
        content: { type: String },
        image: {}
    },
    targets: {
        link : { type : String, match : /((http:\/\/|https:\/\/)?(www.)?(([a-zA-Z0-9-]){2,}\.){1,4}([a-zA-Z]){2,6}(\/([a-zA-Z-_\/\.0-9#:?=&;,]*)?)?)/ },
        social: {
            twitter: { type: String },
            hashtag: { type: String },
            youtube: { type: String },
            facebook : { type : String, match : /((http:\/\/|https:\/\/)?(www.)?(([a-zA-Z0-9-]){2,}\.){1,4}([a-zA-Z]){2,6}(\/([a-zA-Z-_\/\.0-9#:?=&;,]*)?)?)/ }
        }
    }
});


module.exports = AdModel = mongoose.model('ads', Ad);