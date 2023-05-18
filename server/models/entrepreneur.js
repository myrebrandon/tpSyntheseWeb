const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const entrepreneurSchema = new Schema({
    nomComplet:{type:String, required: true},
    courriel:{type:String, required:true, unique:true},
    mdp:{type:String, required:true},
    stages:[{type:mongoose.Types.ObjectId, required:true, ref: "Stage"}]
});

module.exports = mongoose.model("Entrepreneur", entrepreneurSchema);