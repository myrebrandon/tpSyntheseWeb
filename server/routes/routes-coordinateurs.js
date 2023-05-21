const express = require("express");
const controllerCoordinateur = require("../controllers/coordinateur-controller");
const router = express.Router();
const { authentifierToken } = require("../utils/authentification-token");

router.post('/login', controllerCoordinateur.loginCoordinateur);
router.get('/:idCoordinateur', authentifierToken, controllerCoordinateur.retourCoordinateur);
router.post("/inscription", controllerCoordinateur.creerCoordinateur);
router.patch("/:idCoordinateur", authentifierToken, controllerCoordinateur.modifierCoordinateur);
router.delete("/:idCoordinateur", authentifierToken, controllerCoordinateur.deleteCoordinateur);

module.exports = router;