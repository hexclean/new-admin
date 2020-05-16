const express = require("express");
const spLocationController = require("../controllers/spLocation");
const isAuth = require("../../middleware/is-auth");
const router = express.Router();

// Location
// router.get("/allergen-index", isAuth, spLocationController.getIndex);
router.get("/add-location", isAuth, spLocationController.getAddAllergen);
// router.post("/add-allergen", isAuth, spLocationController.postAddAllergen);

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
