var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var Zone = new Schema({
    modified: {type: Date, default: Date.now },
    created: {type: Date},
    impressionCount :  {type:Number, default: 0},
    owner : { type: String },
    website : { type: String }
    infos : {
        name: {type: String},
        description: {type: String}
    },
    type: {
        kind: { type : String, enum: ['image','text','*'] },
        remuneration: { type: String ,enum: ['cpm', 'cpc', '*'] }
    },
    design : {
        textColor: {type : String, default: "#333"},
        borderColor: {type: String, default: "#000"},
        bgColor: {type:String, default: "#fff"},
        titleColor: {type:String, default:"#2672ec"},
        dimensions : { type: String , enum: ['300x233','234x60','125x125','180x150','120x230','200x200','233x233'], default: "300x233" }
    },
    validation : {
        validated : { type : Boolean, default: false },
        validatedOn: {type: Date}
    }
});

ZoneModel = mongoose.model('zones', Zone);
