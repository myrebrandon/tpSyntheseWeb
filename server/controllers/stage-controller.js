const { reponse } = require("express");
const { default: mongoose, mongo } = require("mongoose");

const HttpError = require("../models/http-errors");
const Stage = require("../models/stage");
const Entrepreneur = require("../models/entrepreneur");

const retourDesStages = async (requete, reponse, next) => {
    let listeStages;
    try {
        listeStages = await Stage.find();
        console.log(listeStages);
    } catch(err) {
        return next(new HttpError("Erreur de bd", 500));
    }

    return reponse.status(201).json({listeStages: listeStages});
}

const retourUnStage = async (requete, reponse, next) => {
    const idStage = requete.params.idStage;
    
    let stage;
    
    try {
        stage = await Stage.findById(idStage);
    } catch(err) {
        return next(new HttpError("Erreur de bd", 500));
    }

    if(!stage) {
        return next(new HttpError("Le stage n'existe pas", 401));
    }

    return reponse.status(201).json({stage: stage.toObject({getters: true})});
}

const ajouterStage = async (requete, reponse, next) => {
    const idEntrepreneur = requete.params.idEntrepreneur;
    const { titre, nomCompletContact, courriel, numeroCell, nomEntreprise, adresseEntreprise, type, nbPostes, description, renumeration, etat } = requete.body;

    // Verif si stage existe deja
    let stageExistant;

    try {
        stageExistant = await Stage.findOne({titre:titre, nomCompletContact:nomCompletContact, courriel:courriel, numeroCell:numeroCell, nomEntreprise:nomEntreprise, adresseEntreprise:adresseEntreprise, type:type, description:description});
    } catch(err) {
        return next(new HttpError("Erreur de bd", 500));
    }

    if(stageExistant) {
        return next(new HttpError("Le stage existe deja", 401));
    }

    // Verif si entrepreneur existe
    let entrepreneurExistant;

    try {
        entrepreneurExistant = await Entrepreneur.findById(idEntrepreneur).populate("stages");
    } catch(err) {
        return next(new HttpError("Erreur de bd", 500));
    }

    if(!entrepreneurExistant) {
        return next(new HttpError("L'entrepreneur n'existe pas", 401));
    }

    const nouvStage = new Stage({
        titre,
        entrepreneurId: idEntrepreneur,
        nomCompletContact,
        courriel,
        numeroCell,
        nomEntreprise,
        adresseEntreprise,
        type,
        nbPostes,
        description,
        renumeration,
        etat
    });

    try {
        entrepreneurExistant.stages.push(nouvStage);

        await entrepreneurExistant.save();

        await nouvStage.save();
    } catch(err) {
        return next(new HttpError("Erreur dans la sauvegarde du stage", 500));
    }
    
    return reponse.status(201).json({ nouveauStage: nouvStage.toObject({ getters: true })});
}

module.exports.ajouterStage = ajouterStage;
module.exports.retourUnStage = retourUnStage;
module.exports.retourDesStages = retourDesStages;