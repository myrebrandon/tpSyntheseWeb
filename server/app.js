const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
mongoose.set('strictQuery', true);

const HttpError = require("./models/http-errors");

const routesStages = require("./routes/routes-stages");
const routesEntrepreneurs = require("./routes/routes-entrepreneurs");
const routesEtudiants = require("./routes/routes-etudiants");

const app = express();

app.use(bodyParser.json());

app.use((requete, reponse, next) =>{
    reponse.setHeader("Access-Control-Allow-Origin", "*");
    reponse.setHeader("Access-Control-Allow-Headers", "*");
    reponse.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
    next();
  })

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
.connect("mongodb://127.0.0.1:27017/synthese")
.then(() => {
    app.listen(5000);
    console.log("Connexion a la bd reussie");
})
.catch(error => {
    console.log(error);
});