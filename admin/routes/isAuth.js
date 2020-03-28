const express = require("express");
const isAuthController = require("../controllers/isAuth");
const router = express.Router();

router.get(isAuthController.checkLogin);

module.exports = router;
