const express = require("express");
const spLocationController = require("../controllers/super-admin/spLocation");
const spDashboardController = require("../controllers/super-admin/spDashboard");
const spPartnerController = require("../controllers/super-admin/spPartner");
const spProductController = require("../controllers/super-admin/spProduct");
const spDailyMenuController = require("../controllers/super-admin/spDailyMenu");
const spVariantController = require("../controllers/super-admin/spVariant");
const spExtraController = require("../controllers/super-admin/spExtra");
const spCategoryController = require("../controllers/super-admin/spCategory");
const spAllergenController = require("../controllers/super-admin/spAllergen");

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
router.post("/edit-variant", isAuth, spVariantController.postEditVariant);

// Extras
router.get("/extras", isAuth, spExtraController.getExtras);
router.get("/edit-extra/:extraId", isAuth, spExtraController.getEditExtra);
router.post("/edit-extra", isAuth, spExtraController.postEditExtra);

// Category
router.get("/categorys", isAuth, spCategoryController.getCategory);
router.get(
  "/edit-category/:categoryId",
  isAuth,
  spCategoryController.getEditCategory
);
router.post("/edit-category", isAuth, spCategoryController.postEditCategory);

// Allergens
router.get("/allergens", isAuth, spAllergenController.getAllergens);
router.get(
  "/edit-allergen/:allergenId",
  isAuth,
  spAllergenController.getEditAllergen
);
router.post("/edit-allergen", isAuth, spAllergenController.postEditAllergen);
module.exports = router;
