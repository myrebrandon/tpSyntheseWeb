require("dotenv").config();
const jwt = require("jsonwebtoken");
const { HttpError } = require("../models/http-errors");


function authentifierToken(requete, reponse, next) {
    const headerAuth = requete.headers['authorization'];
    const token = headerAuth ;
    // && headerAuth.split(' ')[1]

    if (token == null) return reponse.sendStatus(401);

    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        console.log(err);

        if(err) return reponse.sendStatus(403);

        return next();
    });
}

module.exports.authentifierToken = authentifierToken;