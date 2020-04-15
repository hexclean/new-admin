const path = require("path");

const express = require("express");

const indexController = require("../controllers/index");
const isAuth = require("../../middleware/is-auth");
const router = express.Router();

// /admin/add-product => GET
router.get("/", isAuth, indexController.indexController);

module.exports = router;
