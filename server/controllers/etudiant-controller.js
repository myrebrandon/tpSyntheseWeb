const { reponse } = require("express");
const { default: mongoose, mongo } = require("mongoose");

const HttpError = require("../models/http-errors");
const Etudiant = require("../models/etudiant");
const { hashage, compare } = require("./passwordManager");

const ajouterEtudiant = async (requete, reponse, next) => {
    const { numDa, nomComplet, courriel, mdp, type } = requete.body;

    let etudiantExistant;

    try {
        etudiantExistant = await Etudiant.findOne({courriel: courriel});
    } catch(err) {
        return next(new HttpError("Erreur de bd", 500));
    }

    if(etudiantExistant) {
        return next(new HttpError("L'etudiant existe deja", 401))
    }
    
    const hashPwd = await hashage(mdp);

    const nouvEtudiant = new Etudiant({
        numDa,
        nomComplet,
        courriel,
        mdp: hashPwd,
        type
    });

    try {
        await nouvEtudiant.save();
    } catch(err) {
        return next(new HttpError("Erreur dans la sauvegarde de l'etudiant", 500));
    }

    reponse.status(201).json({nouveauEtudiant: nouvEtudiant.toObject({getters: true})});
}

module.exports.ajouterEtudiant = ajouterEtudiant;