var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var Website = new Schema({
    modified: { type: Date, default: Date.now },
    created: {type: Date},
    validation: {
        validated : { type : Boolean, default: false },
        validatedOn: {type: Date}
    },
    owner: {type: String},
    infos: {
        name: { type: String, required: true },
        url : { type : String, match : /((http:\/\/|https:\/\/)?(www.)?(([a-zA-Z0-9-]){2,}\.){1,4}([a-zA-Z]){2,6}(\/([a-zA-Z-_\/\.0-9#:?=&;,]*)?)?)/, required: true, unique: true },
        description : { type : String },
        category : { type : String },
        tags: [{type: String}]
    }
});

WebsiteModel = mongoose.model('websites', Website);