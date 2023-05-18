const { reponse } = require("express");
const { default: mongoose, mongo} = require("mongoose");

const jwt = require("jsonwebtoken");
require("dotenv").config();

const HttpError = require("../models/http-errors");
const Entrepreneur = require("../models/entrepreneur");
const Etudiant = require("../models/etudiant");
const Coordinateur = require("../models/coordinateur");
const { compare } = require("./passwordManager");

const login = async (requete, reponse, next) => {
    const { courriel, mdp } = requete.body;

    let user;

    let type;

    try {
        user = await Entrepreneur.findOne({courriel: courriel});
        type = "entrepreneur";
    } catch(err) {
        return next(new HttpError("Erreur de bd", 500));
    }

    if(!user) {
        try {
            user = await Etudiant.findOne({courriel: courriel});
            type = "etudiant";
        } catch(err) {
            return next(new HttpError("Erreur de bd", 500));
        }
    }

    if(!user) {
        try {
            user = await Coordinateur.findOne({courriel: courriel});
            type = "coordinateur";
        } catch(err) {
            return next(new HttpError("Erreur de bd", 500));
        }
    }

    if(!user) {
        return next(new HttpError("Le courriel n'existe pas", 401));
    }

    const verifMdp = await compare(mdp, user.mdp);

    if(!verifMdp) {
        return next(new HttpError("Mauvais mot de passe", 401));
    }

    const token = jwt.sign({id: user.id, type: type}, process.env.TOKEN_SECRET);

    return reponse.status(201).json({message: token});
}

module.exports.login = login;