const express = require("express");
const superAdminController = require("../controllers/superadmin");
const isAuth = require("../../middleware/is-auth");
const isSuper = require("../../middleware/is-super");
const router = express.Router();

// Home
router.get("/home", isAuth, isSuper, superAdminController.getIndex);

// Partners
router.get("/partners", isAuth, isSuper, superAdminController.getPartners);
router.get("/edit-partner/:partnerId", isAuth, superAdminController.getEditPartner);
// router.post("/edit-admin", isAuth, superAdminController.postEditAdmin);

// Users
router.get("/users", isAuth, isSuper, superAdminController.getUsers);




module.exports = router;
