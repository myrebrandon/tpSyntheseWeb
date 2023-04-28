const express = require("express");
const controllerEntrepreneur = require("../controllers/entrepreneur-controller");
const router = express.Router();

router.get("/login", controllerEntrepreneur.loginEntrepreneur);
router.get("/:idEntrepreneur", controllerEntrepreneur.retourEntrepreneur)
router.post("/inscription", controllerEntrepreneur.ajouterEntrepreneur);

module.exports = router;