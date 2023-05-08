const express = require("express");
const controllerEntrepreneur = require("../controllers/entrepreneur-controller");
const router = express.Router();
const { authentifierToken } = require("../utils/authentification-token");

router.get("/", controllerEntrepreneur.retourDesEntrepreneur);
router.get("/login", controllerEntrepreneur.loginEntrepreneur);
router.get("/:idEntrepreneur", authentifierToken, controllerEntrepreneur.retourEntrepreneur)
router.post("/inscription", controllerEntrepreneur.ajouterEntrepreneur);
router.patch("/:idEntrepreneur", authentifierToken, controllerEntrepreneur.modifierEntrepreneur);
router.delete("/:idEntrepreneur", authentifierToken, controllerEntrepreneur.deleteEntrepreneur);

module.exports = router;