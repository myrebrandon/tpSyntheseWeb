const express = require("express");
const controllerGeneral = require("../controllers/general-controller");
const router = express.Router();
const { authentifierToken } = require("../utils/authentification-token");

router.post("/login", controllerGeneral.login);


module.exports = router;