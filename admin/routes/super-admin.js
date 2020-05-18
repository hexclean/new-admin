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
const superAdmin = require("../../middleware/is-super");

const router = express.Router();

// Dashboard
router.get("/dashboard", isAuth, superAdmin, spDashboardController.getIndex);

// Location
router.get("/locations", isAuth, superAdmin, spLocationController.getLocations);
router.get(
  "/add-location",
  isAuth,
  superAdmin,
  spLocationController.getAddLocation
);
router.post(
  "/add-location",
  isAuth,
  superAdmin,
  spLocationController.postAddLocation
);
router.get(
  "/edit-location/:locationId",
  isAuth,
  superAdmin,
  spLocationController.getEditLocation
);
router.post(
  "/edit-location",
  isAuth,
  superAdmin,

  spLocationController.postEditLocation
);

// Partners
router.get("/partners", isAuth, superAdmin, spPartnerController.getPartners);
router.get(
  "/edit-partner/:partnerId",
  isAuth,
  superAdmin,
  spPartnerController.getEditPartner
);
router.post(
  "/edit-partner",
  isAuth,
  superAdmin,

  spPartnerController.postEditPartner
);

// Products
router.get("/products", isAuth, superAdmin, spProductController.getProducts);
router.get(
  "/edit-product/:productId",
  isAuth,
  superAdmin,
  spProductController.getEditProduct
);
router.post(
  "/edit-product",
  isAuth,
  superAdmin,

  spProductController.postEditProduct
);

// Daily Menu
router.get(
  "/daily-menus",
  isAuth,
  superAdmin,
  spDailyMenuController.getDailyMenus
);
router.get(
  "/edit-daily-menu/:dailyMenuId",
  isAuth,
  superAdmin,
  spDailyMenuController.getEditDailyMenu
);
router.post(
  "/edit-daily-menu",
  isAuth,
  superAdmin,

  spDailyMenuController.postEditDailyMenu
);

// Variants
router.get("/variants", isAuth, superAdmin, spVariantController.getVariants);
router.get(
  "/edit-variant/:variantId",
  isAuth,
  superAdmin,
  spVariantController.getEditVariant
);
router.post(
  "/edit-variant",
  isAuth,
  superAdmin,
  spVariantController.postEditVariant
);

// Extras
router.get("/extras", isAuth, superAdmin, spExtraController.getExtras);
router.get(
  "/edit-extra/:extraId",
  isAuth,
  superAdmin,
  spExtraController.getEditExtra
);
router.post("/edit-extra", isAuth, superAdmin, spExtraController.postEditExtra);

// Category
router.get("/categorys", isAuth, superAdmin, spCategoryController.getCategory);
router.get(
  "/edit-category/:categoryId",
  isAuth,
  superAdmin,
  spCategoryController.getEditCategory
);
router.post(
  "/edit-category",
  isAuth,
  superAdmin,
  spCategoryController.postEditCategory
);

// Allergens
router.get("/allergens", isAuth, superAdmin, spAllergenController.getAllergens);
router.get(
  "/edit-allergen/:allergenId",
  isAuth,
  superAdmin,
  spAllergenController.getEditAllergen
);
router.post(
  "/edit-allergen",
  isAuth,
  superAdmin,
  spAllergenController.postEditAllergen
);
module.exports = router;
