const { reponse } = require("express");
const { default: mongoose, mongo} = require("mongoose");

const jwt = require("jsonwebtoken");
require("dotenv").config();

const HttpError = require("../models/http-errors");
const Coordinateur = require("../models/coordinateur");
const Entrepreneur = require("../models/entrepreneur");
const Etudiant = require("../models/etudiant");
const { hashage, compare } = require("./passwordManager");

const loginCoordinateur = async (requete, reponse, next) => {
    const { courriel, mdp } = requete.body;

    let coordinateur;

    try {
        coordinateur = await Coordinateur.findOne({courriel: courriel});
    } catch(err) {
        return next(new HttpError("Erreur de bd", 500));
    }

    if(!coordinateur) {
        return next(new HttpError("Courriel inexistant", 401));
    }

    const verifMdp = await compare(mdp, coordinateur.mdp);

    if(!verifMdp) {
        return next(new HttpError("Mauvais mot de passe", 401));
    }

    const token = jwt.sign({id: coordinateur.id, type: "coordinateur"}, process.env.TOKEN_SECRET);

    return reponse.status(201).json({message: token});
}

const retourCoordinateur = async (requete, reponse, next) => {
    const idCoordinateur = requete.params.idCoordinateur;

    let coordinateur;

    try {
        coordinateur = await Coordinateur.findById(idCoordinateur, "-mdp");
    } catch(err) {
        return next(new HttpError("Erreur de bd", 500));
    }

    if(!coordinateur) {
        return next(new HttpError("Le coordinateur n'existe pas", 401));
    }
    
    return reponse.status(201).json({coordinateur: coordinateur.toObject({getters: true})});
}

const creerCoordinateur = async (requete, reponse, next) => {
    const { nomComplet, courriel, mdp } = requete.body;

    let coordinateurExistant;
    let emailEntreExistant;
    let emailEtuExistant;

    try {
        coordinateurExistant = await Coordinateur.findOne({courriel: courriel});
        emailEntreExistant = await Entrepreneur.findOne({courriel: courriel});
        emailEtuExistant = await Etudiant.findOne({courriel: courriel});
    } catch(err) {
        return next(new HttpError("Erreur de bd", 500));
    }

    if(coordinateurExistant) {
        return next(new HttpError("Le coordinateur existe deja", 401));
    } 

    if(emailEntreExistant) {
        return next(new HttpError("Le email est deja utilise", 401));
    }

    if(emailEtuExistant) {
        return next(new HttpError("Le email est deja utilise", 401));
    }

    let hashedPwd = await hashage(mdp);

    const nouvCoordinateur = new Coordinateur({
        nomComplet: nomComplet,
        courriel: courriel,
        mdp: hashedPwd
    });

    try {
        await nouvCoordinateur.save();
    } catch(err) {
        return next(new HttpError("Erreur dans la sauvegarde du coordinateur", 500));
    }

    return reponse.status(201).json({nouvCoordinateur: nouvCoordinateur.toObject({getters: true})});
}

const modifierCoordinateur = async (requete, reponse, next) => {
    const idCoordinateur = requete.params.idCoordinateur;
    const { nomComplet, courriel, mdp } = requete.body;

    let coordinateur;

    try {
        coordinateur = await Coordinateur.findById(idCoordinateur);
    } catch(err) {
        return next(new HttpError("Erreur de bd", 500));
    }

    if(!coordinateur) {
        return next(new HttpError("Le coordinateur n'existe pas", 401));
    }

    try {
        if(nomComplet != null) {
            coordinateur.nomComplet = nomComplet;
        }

        if(courriel != null) {
            let emailExistant;
            let emailExistantEtu;
            let emailExistantEmplo;
            try {
                emailExistant = await Coordinateur.findOne({courriel:courriel});
                emailExistantEmplo = await Entrepreneur.findOne({courriel:courriel});
                emailExistantEtu = await Etudiant.findOne({courriel:courriel});
                if(!emailExistant && !emailExistantEtu && !emailExistantEmplo) {
                    coordinateur.courriel = courriel;
                } else {
                    return next(new HttpError("Le email est deja utilise", 401));
                }
            } catch(err) {
                return next(new HttpError("Erreur de bd", 500));
            }
        }

        if(mdp != null) {
            let verifMdp = await compare(mdp, coordinateur.mdp);
            if(!verifMdp) {
                let hashedMdp = await hashage(mdp);
                coordinateur.mdp = hashedMdp;
            } else {
                return next(new HttpError("Le mot de passe n'a pas change", 401));
            }
        }

        await coordinateur.save();
    } catch(err) {
        return next(new HttpError("Erreur de modification", 401));
    }

    return reponse.status(201).json({message: "Coordinateur bien modifie"});
}

const deleteCoordinateur = async (requete, reponse, next) => {
    const idCoordinateur = requete.params.idCoordinateur;
    
    let coordinateur;

    try {
        coordinateur = await Coordinateur.findById(idCoordinateur);
    } catch(err) {
        return next(new HttpError("Erreur de bd", 500));
    }

    if(!coordinateur) {
        return next(new HttpError("Le coordinateur n'existe pas", 401));
    }

    try {
        await Coordinateur.findByIdAndRemove(idCoordinateur);
    } catch(err) {
        return next(new HttpError("Erreur dans la supression de l'entrepreneur", 401));
    }

    return reponse.status(201).json({message: "Coordinateur bien supprime"});
}

module.exports.loginCoordinateur = loginCoordinateur;
module.exports.retourCoordinateur = retourCoordinateur;
module.exports.creerCoordinateur = creerCoordinateur;
module.exports.modifierCoordinateur = modifierCoordinateur;
module.exports.deleteCoordinateur = deleteCoordinateur;