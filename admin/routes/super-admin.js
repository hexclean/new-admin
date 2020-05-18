const express = require("express");
const spLocationController = require("../controllers/super-admin/spLocation");
const spDashboardController = require("../controllers/super-admin/spDashboard");
const spPartnerController = require("../controllers/super-admin/spPartner");
const spProductController = require("../controllers/super-admin/spProduct");
const spDailyMenuController = require("../controllers/super-admin/spDailyMenu");
const spVariantController = require("../controllers/super-admin/spVariant");

const isAuth = require("../../middleware/is-auth");
const router = express.Router();

// Dashboard
router.get("/dashboard", isAuth, spDashboardController.getIndex);

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

// Partners
router.get("/partners", isAuth, spPartnerController.getPartners);
router.get(
  "/edit-partner/:partnerId",
  isAuth,
  spPartnerController.getEditPartner
);
router.post(
  "/edit-partner",
  isAuth,

  spPartnerController.postEditPartner
);

// Products
router.get("/products", isAuth, spProductController.getProducts);
router.get(
  "/edit-product/:productId",
  isAuth,
  spProductController.getEditProduct
);
router.post(
  "/edit-product",
  isAuth,

  spProductController.postEditProduct
);

// Daily Menu
router.get("/daily-menus", isAuth, spDailyMenuController.getDailyMenus);
router.get(
  "/edit-daily-menu/:dailyMenuId",
  isAuth,
  spDailyMenuController.getEditDailyMenu
);
router.post(
  "/edit-daily-menu",
  isAuth,

  spDailyMenuController.postEditDailyMenu
);

// Variants
router.get("/variants", isAuth, spVariantController.getVariants);
router.get(
  "/edit-variant/:variantId",
  isAuth,
  spVariantController.getEditVariant
);
router.post(
  "/edit-daily-menu",
  isAuth,

  spDailyMenuController.postEditDailyMenu
);
module.exports = router;
