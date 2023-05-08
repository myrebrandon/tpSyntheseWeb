const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
mongoose.set('strictQuery', true);

require("dotenv").config();

const HttpError = require("./models/http-errors");

const routesStages = require("./routes/routes-stages");
const routesEntrepreneurs = require("./routes/routes-entrepreneurs");
const routesEtudiants = require("./routes/routes-etudiants");

const app = express();

app.use(bodyParser.json());

app.use(cors());

// Routes
app.use('/api/stages', routesStages);
app.use('/api/entrepreneurs', routesEntrepreneurs);
app.use('/api/etudiants', routesEtudiants);

app.use((requete, reponse, next) => {
    return next(new HttpError("Route non rejoignable", 404));
});

app.use((error, requete, reponse, next) => {
    if(reponse.headerSent) {
        return next(error);
    }

    reponse.status(error.code || 500);
    reponse.json({
        message: error.message || "Une erreur inconnue est survenue"
    });
});

mongoose
.connect(process.env.DBLINK)
.then(() => {
    app.listen(5000);
    console.log("Connexion a la bd reussie");
})
.catch(error => {
    console.log(error);
});