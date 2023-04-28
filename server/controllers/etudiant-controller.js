const { reponse } = require("express");
const { default: mongoose, mongo } = require("mongoose");

const HttpError = require("../models/http-errors");
const Etudiant = require("../models/etudiant");
const Stage = require("../models/stage");
const { hashage, compare } = require("./passwordManager");

const loginEtudiant = async (requete, reponse, next) => {
    const { courriel, mdp } = requete.body;

    let etudiant;

    try {
        etudiant = await Etudiant.findOne({courriel: courriel});
    } catch(err) {
        return next(new HttpError("Erreur de bd", 500));
    }

    if(!etudiant) {
        return next(new HttpError("Courriel inexistant", 401));
    }

    const verifMdp = await compare(mdp, etudiant.mdp);

    if(!verifMdp) {
        return next(new HttpError("Mauvais mot de passe", 401));
    }

    return reponse.status(201).json({message: etudiant.id});
}

const retourEtudiant = async (requete, reponse, next) => {
    const idEtudiant = requete.params.idEtudiant;

    let etudiant;

    try {
        etudiant = await Etudiant.findById(idEtudiant, "-mdp");
    } catch(err) {
        return next(new HttpError("Erreur de bd", 500));
    }

    if(!etudiant) {
        return next(new HttpError("L'etudiant n'existe pas", 401));
    }

    return reponse.status(201).json({etudiant: etudiant.toObject({getters: true})});
}

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

    return reponse.status(201).json({nouveauEtudiant: nouvEtudiant.toObject({getters: true})});
}

const postuler = async (requete, reponse, next) => {
    const idEtudiant = requete.params.idEtudiant;
    const { idStage } = requete.body;

    let etudiant;

    try {
        etudiant = await Etudiant.findById(idEtudiant).populate("stages");
    } catch(err) {
        return next(new HttpError("Erreur de bd", 500));
    }

    if(!etudiant) {
        return next(new HttpError("L'etudiant n'existe pas", 401));
    }

    let stage;

    try {
        stage = await Stage.findById(idStage);
    } catch(err) {
        return next(new HttpError("Erreur de bd", 500));
    }

    if(!stage) {
        return next(new HttpError("Le stage n'existe pas", 401));
    }

    try {
        for(let st of etudiant.stages) {
            if(st.id === stage.id) {
                return next(new HttpError("L'etudiant a deja postuler pour ce stage", 401));
            }  
        }
    } catch(err) {
        return next(new HttpError("Erreur dans verification si il a deja postule", 401));
    }
    

    try {
        etudiant.stages.push(stage);

        await etudiant.save();
    } catch(err) {
        return next(new HttpError("Erreur de postulation", 500));
    }

    return reponse.status(201).json({message: "L'etudiant a bien postule"});
}

module.exports.ajouterEtudiant = ajouterEtudiant;
module.exports.loginEtudiant = loginEtudiant;
module.exports.retourEtudiant = retourEtudiant;
module.exports.postuler = postuler;