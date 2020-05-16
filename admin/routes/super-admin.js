const express = require("express");
const spLocationController = require("../controllers/super-admin/spLocation");
const isAuth = require("../../middleware/is-auth");
const router = express.Router();

// Location
// router.get("/allergen-index", isAuth, spLocationController.getIndex);
router.get("/add-location", isAuth, spLocationController.getAddAllergen);
router.post("/add-location", isAuth, spLocationController.postAddLocation);

// router.get(
//   "/edit-allergen/:allergenId",
//   isAuth,
//   spLocationController.getEditAllergen
// );

// router.post(
//   "/edit-allergen",
//   isAuth,

//   spLocationController.postEditAllergen
// );

module.exports = router;
