const express = require("express");
const controllerStage = require("../controllers/stage-controller");
const router = express.Router();

router.get("/", controllerStage.retourDesStages);
router.get("/:idStage", controllerStage.retourUnStage);
router.post("/:idEntrepreneur", controllerStage.ajouterStage);

module.exports = router;