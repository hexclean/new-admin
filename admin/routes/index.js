const path = require("path");

const express = require("express");

const indexController = require("../controllers/index");

const router = express.Router();

// /admin/add-product => GET
router.get("/", indexController.indexController);

module.exports = router;
