const express = require("express");
const superAdminController = require("../controllers/superadmin");
const isAuth = require("../../middleware/is-auth");
const isSuper = require("../../middleware/is-super");
const router = express.Router();

router.get("/home", isAuth, isSuper, superAdminController.getIndex);
router.get("/partners", isAuth, isSuper, superAdminController.getPartners);
router.get("/users", isAuth, isSuper, superAdminController.getUsers);

module.exports = router;
