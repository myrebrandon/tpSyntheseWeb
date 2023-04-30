const { reponse } = require("express");
const { default: mongoose, mongo} = require("mongoose");

const HttpError = require("../models/http-errors");
const Entrepreneur = require("../models/entrepreneur");
const Stage = require("../models/stage");
const { hashage, compare } = require("./passwordManager");


const loginEntrepreneur = async (requete, reponse, next) => {
    const { courriel, mdp } = requete.body;

    let entrepreneur;

    try {
        entrepreneur = await Entrepreneur.findOne({courriel: courriel});
    } catch(err) {
        return next(new HttpError("Erreur de bd", 500));
    }

    if(!entrepreneur) {
        return next(new HttpError("Courriel inexistant", 401));
    }

    const verifMdp = await compare(mdp, entrepreneur.mdp);

    if(!verifMdp) {
        return next(new HttpError("Mauvais mot de passe", 401));
    }

    return reponse.status(201).json({message: entrepreneur.id});
}

const retourEntrepreneur = async (requete, reponse, next) => {
    const idEntrepreneur = requete.params.idEntrepreneur;

    let entrepreneur;

    try {
        entrepreneur = await Entrepreneur.findById(idEntrepreneur, "-mdp");
    } catch(err) {
        return next(new HttpError("Erreur de bd", 500));
    }

    if(!entrepreneur) {
        return next(new HttpError("L'entrepreneur n'existe pas", 401));
    }
    
    return reponse.status(201).json({entrepreneur: entrepreneur.toObject({getters: true})});
}

const ajouterEntrepreneur = async (requete, reponse, next) => {
    const { nomComplet, courriel, mdp } = requete.body;

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

const deleteEntrepreneur = async (requete, reponse, next) => {
    const idEntrepreneur = requete.params.idEntrepreneur;
    
    let entrepreneur;

    try {
        entrepreneur = await Entrepreneur.findById(idEntrepreneur).populate("stages");
    } catch(err) {
        return next(new HttpError("Erreur de bd", 500));
    }

    if(!entrepreneur) {
        return next(new HttpError("L'entrepreneur n'existe pas", 401));
    }

    try {
        for(let st of entrepreneur.stages) {
            await Stage.findByIdAndRemove(st.id);
        }

        await Entrepreneur.findByIdAndRemove(entrepreneur.id);
    } catch(err) {
        return next(new HttpError("Erreur dans la supression de l'entrepreneur", 401));
    }

    return reponse.status(201).json({message: "Entrepreneur bien supprime"});
}

module.exports.ajouterEntrepreneur = ajouterEntrepreneur;
module.exports.loginEntrepreneur = loginEntrepreneur;
module.exports.retourEntrepreneur = retourEntrepreneur;
module.exports.deleteEntrepreneur = deleteEntrepreneur;