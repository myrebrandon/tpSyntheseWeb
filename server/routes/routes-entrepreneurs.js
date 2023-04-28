const express = require("express");
const controllerEntrepreneur = require("../controllers/entrepreneur-controller");
const router = express.Router();

router.post("/inscription", controllerEntrepreneur.ajouterEntrepreneur);

module.exports = router;