var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var Impression = new Schema({
    occured: { type: Date, default: Date.now(); },
    pageUrl: {type: String},
    zone: [{type: String}],
}, capped: { size: 52428800, max: 100000 } );




ImpressionModel = mongoose.model('impressions', Impression);