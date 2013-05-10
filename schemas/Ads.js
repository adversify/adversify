var mongoose = require('mongoose');

var Schema = mongoose.Schema;


var Ad = new Schema({
    infos: {
        name: { type: String },
        description: { type: String }
    },
    options: {
        type: { type : String, enum: ['image','text','*'], default: '*' },
        remuneration: { type: String ,enum: ['cpm', 'cpc', '*'], default: '*' },
        budget: {
            dayLimit : { type: Number },
            weekLimit: { type: Number },
            monthLimit: { type: Number},
            ratio : { type: String }
        }
    },
    validated : { type : Boolean, default: false },
    content : {}
});

WebsiteModel = mongoose.model('ads', Ad);