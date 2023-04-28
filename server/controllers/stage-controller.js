const { reponse } = require("express");
const { default: mongoose, mongo } = require("mongoose");

const HttpError = require("../models/http-errors");
const Stage = require("../models/stage");
const Entrepreneur = require("../models/entrepreneur");

const ajouterStage = async (requete, reponse, next) => {
    const idEntrepreneur = requete.params.idEntrepreneur;
    const { titre, nomCompletContact, courriel, numeroCell, nomEntreprise, adresseEntreprise, type, nbPostes, description, renumeration, etat } = requete.body;

    // Verif si existe deja

    // Verif si entrepreneur existe
    let entrepreneurExistant;

    try {
        entrepreneurExistant = await Entrepreneur.findById(idEntrepreneur);
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
        await nouvStage.save();
        // Ajouter a la liste de l'entrepreneur
    } catch(err) {
        return next(new HttpError("Erreur dans la sauvegarde du stage", 500));
    }
    
    return reponse.status(201).json({ nouveauStage: nouvStage.toObject({ getters: true })});
}

module.exports.ajouterStage = ajouterStage;