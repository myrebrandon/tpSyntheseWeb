const express = require("express");
const controllerEntrepreneur = require("../controllers/entrepreneur-controller");
const router = express.Router();

router.get("/", controllerEntrepreneur.retourDesEntrepreneur);
router.get("/login", controllerEntrepreneur.loginEntrepreneur);
router.get("/:idEntrepreneur", controllerEntrepreneur.retourEntrepreneur)
router.post("/inscription", controllerEntrepreneur.ajouterEntrepreneur);
router.delete("/:idEntrepreneur", controllerEntrepreneur.deleteEntrepreneur);

module.exports = router;