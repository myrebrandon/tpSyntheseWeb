const express = require("express");
const controllerStage = require("../controllers/stage-controller");
const router = express.Router();

router.get("/", controllerStage.retourDesStages);
router.get("/:idStage", controllerStage.retourUnStage);
router.post("/:idEntrepreneur", controllerStage.ajouterStage);
router.patch("/:idStage", controllerStage.modifierStage);
router.delete("/:idStage", controllerStage.deleteStage);

module.exports = router;