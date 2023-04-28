const express = require("express");
const controllerEtudiant = require("../controllers/etudiant-controller");
const router = express.Router();

router.get("/login", controllerEtudiant.loginEtudiant);
router.get("/:idEtudiant", controllerEtudiant.retourEtudiant);
router.post("/inscription", controllerEtudiant.ajouterEtudiant);
router.patch("/:idEtudiant/postuler", controllerEtudiant.postuler);

module.exports = router;