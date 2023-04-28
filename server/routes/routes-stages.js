const express = require("express");
const controllerStage = require("../controllers/stage-controller");
const router = express.Router();

router.post("/:idEntrepreneur", controllerStage.ajouterStage);

module.exports = router;