const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Types = require("./types");

const stageSchema = new Schema({
    titre:{type:String, required:true},
    entrepreneurId:{type:String, required:true},
    nomCompletContact:{type:String, required:true},
    courriel:{type:String, required:true},
    numeroCell:{type:String, required:true},
    nomEntreprise:{type:String, required:true},
    adresseEntreprise:{type:String, required:true},
    type:{type:String, enum: [Types.Reseaux, Types.Developpement], required:true},
    nbPostes:{type:String, required:true},
    description:{type:String, required:true},
    renumeration:{type:String, required:true},
    etat:{type:String, required:true}
});

module.exports = mongoose.model("Stage", stageSchema);