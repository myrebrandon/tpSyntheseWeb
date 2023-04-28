const { reponse } = require("express");
const { default: mongoose, mongo} = require("mongoose");

const HttpError = require("../models/http-errors");
const Entrepreneur = require("../models/entrepreneur");
const { hashage, compare } = require("./passwordManager");


const ajouterEntrepreneur = async (requete, reponse, next) => {
    const { nomComplet, courriel, mdp} = requete.body;

    let entrepreneurExistant;

    try {
        entrepreneurExistant = await Entrepreneur.findOne({courriel: courriel});
    } catch(err) {
        return next(new HttpError("Erreur de bd", 500));
    }

    if(entrepreneurExistant) {
        return next(new HttpError("L'entrepreneur existe deja", 401));
    }

    let hashedPwd = await hashage(mdp);

    const nouvEntrepreneur = new Entrepreneur({
        nomComplet: nomComplet,
        courriel: courriel,
        mdp: hashedPwd,
        stages: []
    });

    try {
        await nouvEntrepreneur.save();
    } catch(err) {
        console.log(err);
        return next(new HttpError("Erreur dans la sauvegarde de l'entrepreneur", 500));
    }

    return reponse.status(201).json({nouveauEntrepreneur: nouvEntrepreneur.toObject({getters: true})});
} 

module.exports.ajouterEntrepreneur = ajouterEntrepreneur;