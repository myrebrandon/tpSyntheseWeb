const express = require("express");
const controllerStage = require("../controllers/stage-controller");
const router = express.Router();
const { authentifierToken } = require("../utils/authentification-token");

router.get("/", controllerStage.retourDesStages);
router.get("/:idStage", controllerStage.retourUnStage);
router.post("/:idEntrepreneur", authentifierToken,controllerStage.ajouterStage);
router.patch("/:idStage", authentifierToken, controllerStage.modifierStage);
router.delete("/:idStage", authentifierToken,controllerStage.deleteStage);

module.exports = router;