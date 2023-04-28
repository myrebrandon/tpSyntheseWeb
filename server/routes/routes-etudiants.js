const express = require("express");
const controllerEtudiant = require("../controllers/etudiant-controller");
const router = express.Router();

router.get("/login", controllerEtudiant.loginEtudiant);
router.post("/inscription", controllerEtudiant.ajouterEtudiant);

module.exports = router;