const { reponse } = require("express");
const { default: mongoose, mongo} = require("mongoose");

const jwt = require("jsonwebtoken");
require("dotenv").config();

const HttpError = require("../models/http-errors");
const Entrepreneur = require("../models/entrepreneur");
const Etudiant = require("../models/etudiant");
const Coordinateur = require("../models/coordinateur");
const Stage = require("../models/stage");
const { hashage, compare } = require("./passwordManager");

const retourDesEntrepreneur = async (requete, reponse, next) => {
    let listeEntrepreneur;
    try {
        const selectedFields = { mdp: 0 }

        listeEntrepreneur = await Entrepreneur.find().select(selectedFields);
    } catch(err) {
        return next(new HttpError("Erreur de bd", 500));
    }

    return reponse.status(201).json({listeEntrepreneur: listeEntrepreneur});
}

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

    const token = jwt.sign({id: entrepreneur.id}, process.env.TOKEN_SECRET);

    return reponse.status(201).json({message: token});
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
    let emailEtuExistant;
    let emailCoordinateur;

    try {
        entrepreneurExistant = await Entrepreneur.findOne({courriel: courriel});
        emailEtuExistant = await Etudiant.findOne({courriel: courriel});
        emailCoordinateur = await Coordinateur.findOne({courriel: courriel});
    } catch(err) {
        return next(new HttpError("Erreur de bd", 500));
    }

    if(entrepreneurExistant) {
        return next(new HttpError("L'entrepreneur existe deja", 401));
    }

    if(emailEtuExistant) {
        return next(new HttpError("Le email est deja utilise", 401));
    }

    if(emailCoordinateur) {
        return next(new HttpError("Le email est deja utilise", 401));
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

const modifierEntrepreneur = async (requete, reponse, next) => {
    const idEntrepreneur = requete.params.idEntrepreneur;
    const { nomComplet, courriel, mdp } = requete.body;

    let entrepreneur;

    try {
        entrepreneur = await Entrepreneur.findById(idEntrepreneur);
    } catch(err) {
        return next(new HttpError("Erreur de bd", 500));
    }

    if(!entrepreneur) {
        return next(new HttpError("L'entrepreneur n'existe pas", 401));
    }

    try {
        if(nomComplet != null) {
            entrepreneur.nomComplet = nomComplet;
        }

        if(courriel != null) {
            let emailExistant;
            let emailExistantEtu;
            try {
                emailExistant = await Entrepreneur.findOne({courriel:courriel});
                emailExistantEtu = await Etudiant.findOne({courriel:courriel});
                if(!emailExistant && !emailExistantEtu) {
                    entrepreneur.courriel = courriel;
                } else {
                    return next(new HttpError("Le email est deja utilise", 401));
                }
            } catch(err) {
                return next(new HttpError("Erreur de bd", 500));
            }
        }

        if(mdp != null) {
            let verifMdp = await compare(mdp, entrepreneur.mdp);
            if(!verifMdp) {
                let hashedMdp = await hashage(mdp);
                entrepreneur.mdp = hashedMdp;
            } else {
                return next(new HttpError("Le mot de passe n'a pas change", 401));
            }
        }

        await entrepreneur.save();
    } catch(err) {
        return next(new HttpError("Erreur de modification", 401));
    }

    return reponse.status(201).json({message: "Entrepreneur bien modifie"});
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

        await Entrepreneur.findByIdAndRemove(idEntrepreneur);
    } catch(err) {
        return next(new HttpError("Erreur dans la supression de l'entrepreneur", 401));
    }

    return reponse.status(201).json({message: "Entrepreneur bien supprime"});
}

module.exports.retourDesEntrepreneur = retourDesEntrepreneur;
module.exports.ajouterEntrepreneur = ajouterEntrepreneur;
module.exports.loginEntrepreneur = loginEntrepreneur;
module.exports.modifierEntrepreneur = modifierEntrepreneur;
module.exports.retourEntrepreneur = retourEntrepreneur;
module.exports.deleteEntrepreneur = deleteEntrepreneur;