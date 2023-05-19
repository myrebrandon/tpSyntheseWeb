const { reponse } = require("express");
const { default: mongoose, mongo } = require("mongoose");

const HttpError = require("../models/http-errors");
const Stage = require("../models/stage");
const Entrepreneur = require("../models/entrepreneur");
const Etudiant = require("../models/etudiant");

const retourDesStages = async (requete, reponse, next) => {
    let listeStages;
    try {
        listeStages = await Stage.find();
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
        etat,
        etudiantsPostuler: [],
        etudiantsAffectes: []
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

const modifierStage = async (requete, reponse, next) => {
    const idStage = requete.params.idStage;
    const { titre, nomCompletContact, courriel, numeroCell, nomEntreprise, adresseEntreprise, type, nbPostes, description, renumeration, etat } = requete.body;

    let stage;

    try {
        stage = await Stage.findById(idStage);
    } catch(err) {
        return next(new HttpError("Erreur de bd", 500));
    }

    if(!stage) {
        return next(new HttpError("Le stage n'existe pas", 401));
    }

    let stageExistant;

    try {
        stageExistant = await Stage.findOne({titre:titre, nomCompletContact:nomCompletContact, courriel:courriel, numeroCell:numeroCell, nomEntreprise:nomEntreprise, adresseEntreprise:adresseEntreprise, type:type, description:description});
    } catch(err) {
        return next(new HttpError("Erreur de bd", 500));
    }

    if(stageExistant) {
        return next(new HttpError("Le stage existe deja", 401));
    }

    try {
        if(titre) {
            stage.titre = titre;
        }

        if(nomCompletContact) {
            stage.nomCompletContact = nomCompletContact;
        }

        if(courriel) {
            stage.courriel = courriel;
        }

        if(numeroCell) {
            stage.numeroCell = numeroCell;
        }

        if(nomEntreprise) {
            stage.adresseEntreprise = adresseEntreprise;
        }

        if(type) {
            stage.type = type;
        }

        if(etat) {
            stage.etat = etat;
        }

        if (renumeration){
            stage.renumeration = renumeration;
        }

        if(nbPostes){
            stage.nbPostes = nbPostes;
        }

        await stage.save();
    } catch(err) {
        return next(new HttpError("Erreur dans la modification du stage", 500));
    }

    return reponse.status(201).json({stageModifier: stage.toObject({getters: true})});
}

const deleteStage = async (requete, reponse, next) => {
    const idStage = requete.params.idStage;
    
    let stage;

    try {
        stage = await Stage.findById(idStage).populate("etudiantsPostuler");
    } catch(err) {
        return next(new HttpError("Erreur de bd", 500));
    }

    if(!stage) {
        return next(new HttpError("Le stage n'existe pas", 401));
    }

    try {
        for(let etu of stage.etudiantsPostuler) {
            let etudiant;
            etudiant = await Etudiant.findById(etu.id).populate("stages");
            etudiant.stages.pop(stage);
            await etudiant.save();
        }

        let entrepreneur;
        entrepreneur = await Entrepreneur.findById(stage.entrepreneurId);
        entrepreneur.stages.pop(stage);
        await entrepreneur.save();

        await Stage.findByIdAndRemove(idStage);
    } catch(err) {
        return next(new HttpError("Erreur dans la supression du stage", 401));
    }

    return reponse.status(201).json({message: "Le stage a bien ete supprime"});
}

module.exports.ajouterStage = ajouterStage;
module.exports.retourUnStage = retourUnStage;
module.exports.retourDesStages = retourDesStages;
module.exports.modifierStage = modifierStage;
module.exports.deleteStage = deleteStage;