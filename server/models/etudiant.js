const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Types = require("./types");

const etudiantSchema = new Schema({
    numDa:{type:String, required:true},
    nomComplet:{type:String, required:true},
    courriel:{type:String, required:true},
    mdp:{type:String, required:true},
    type:{type:String, enum: [Types.Reseaux, Types.Developpement], required:true},
    stages:[{type:mongoose.Types.ObjectId, required:true, ref:"Stage"}]
});

module.exports = mongoose.model("Etudiant", etudiantSchema);