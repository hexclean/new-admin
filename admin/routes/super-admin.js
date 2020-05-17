const express = require("express");
const spLocationController = require("../controllers/super-admin/spLocation");
const isAuth = require("../../middleware/is-auth");
const router = express.Router();

// Location
router.get("/locations", isAuth, spLocationController.getLocations);
router.get("/add-location", isAuth, spLocationController.getAddLocation);
router.post("/add-location", isAuth, spLocationController.postAddLocation);

router.get(
  "/edit-location/:locationId",
  isAuth,
  spLocationController.getEditLocation
);

router.post(
  "/edit-location",
  isAuth,

  spLocationController.postEditLocation
);

module.exports = router;
