const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const coordinateurSchema = new Schema({
    nomComplet:{type:String, required:true},
    courriel:{type:String, required:true},
    mdp:{type:String, required:true}
});

module.exports = mongoose.model("Coordinateur", coordinateurSchema);