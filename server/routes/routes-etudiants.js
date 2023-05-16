const express = require("express");
const controllerEtudiant = require("../controllers/etudiant-controller");
const router = express.Router();
const { authentifierToken } = require("../utils/authentification-token");

router.get("/", controllerEtudiant.retourDesEtudiants);
router.get("/login", controllerEtudiant.loginEtudiant);
router.get("/:idEtudiant", authentifierToken, controllerEtudiant.retourEtudiant);
router.post("/inscription", controllerEtudiant.ajouterEtudiant);
router.patch("/:idEtudiant/postuler", authentifierToken, controllerEtudiant.postuler);
router.patch("/:idEtudiant", authentifierToken, controllerEtudiant.modifierEtudiant);
router.delete("/:idEtudiant", authentifierToken, controllerEtudiant.deleteEtudiant);

module.exports = router;