var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var ActionModel;


var Action = new Schema({
    name: {type: String},
    user: {type: String},
    item: {type: String},
    list:{type: String},
    occured: {type: Date, default: Date.now},
});

module.exports = ActionModel = mongoose.model('actions', Action);
