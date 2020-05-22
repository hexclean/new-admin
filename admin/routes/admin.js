const express = require("express");
const adminController = require("../controllers/admin");
const extraController = require("../controllers/extra");
const variantsController = require("../controllers/variants");
const faqController = require("../controllers/faq");
const categoryController = require("../controllers/category");
const adminProfileController = require("../controllers/profile");
const dailyMenuController = require("../controllers/daily-menu");
const allergenController = require("../controllers/allergen");
const deletedItemsController = require("../controllers/deleted-items");
const isAuth = require("../../middleware/is-auth");
const router = express.Router();

// FAQ
router.get("/faq-index", isAuth, faqController.getIndex);
router.get("/vr-index", isAuth, variantsController.getIndex);

// VARIANT
router.get("/add-variant", isAuth, variantsController.getAddVariant);
router.post("/add-variant", isAuth, variantsController.postAddVariant);
router.get(
  "/edit-variant/:variantId",
  isAuth,
  variantsController.getEditVariant
);
router.post("/edit-variant", isAuth, variantsController.postEditVariant);
router.post("/delete-variant", variantsController.postDeleteVariant);

// CATEGORY
router.get("/add-category", isAuth, categoryController.getAddCategory);
router.post("/add-category", isAuth, categoryController.postAddCategory);
router.get(
  "/edit-category/:categoryId",
  isAuth,
  categoryController.getEditCategory
);
router.post("/edit-category", isAuth, categoryController.postEditCategory);

// EXTRA
router.get("/add-extra", isAuth, extraController.getAddExtra);
router.get("/extras", isAuth, extraController.getExtras);
router.get("/edit-extra/:extraId", isAuth, extraController.getEditExtra);
router.post("/edit-extra", isAuth, extraController.postEditExtra);
router.post("/add-extra", isAuth, extraController.postAddExtra);

// Product
router.get("/add-product", isAuth, adminController.getAddProduct);
router.get("/products", isAuth, adminController.getProducts);
router.post("/add-product", adminController.postAddProduct);
router.get("/edit-product/:productId", isAuth, adminController.getEditProduct);
router.post("/edit-product", isAuth, adminController.postEditProduct);
router.post("/delete-product", isAuth, adminController.postDeleteProduct);

// Profile
router.get(
  "/edit-opening-hours/:adminId",
  adminProfileController.getEditOpeningHours
);

//
router.post("/edit-profile", isAuth, adminProfileController.postEditProfile);
router.get("/edit-profile/:adminId", adminProfileController.getEditProfile);
router.get("/dashboard", isAuth, adminProfileController.getDashboard);

// Daily Menu
router.get("/daily-menus-index", isAuth, dailyMenuController.getIndex);
router.post("/delete-daily-menu", dailyMenuController.postDeleteDailyMenu);
router.get("/add-daily-menu", isAuth, dailyMenuController.getAddDailyMenu);
router.post("/add-daily-menu", isAuth, dailyMenuController.postAddDailyMenu);
router.get(
  "/edit-daily-menu/:dailyMenuId",
  isAuth,
  dailyMenuController.getEditDailyMenu
);
router.post(
  "/edit-daily-menu",
  isAuth,

  dailyMenuController.postEditDailyMenu
);

// Allergen
router.get("/allergen-index", isAuth, allergenController.getIndex);
router.get("/add-allergen", isAuth, allergenController.getAddAllergen);
router.post("/add-allergen", isAuth, allergenController.postAddAllergen);
router.get(
  "/edit-allergen/:allergenId",
  isAuth,
  allergenController.getEditAllergen
);
router.post(
  "/edit-allergen",
  isAuth,

  allergenController.postEditAllergen
);

// Deleted Items
router.get("/deleted-items", isAuth, deletedItemsController.getIndex);
router.get("/deleted-products", isAuth, deletedItemsController.getProducts);
router.post(
  "/restore-product",
  isAuth,
  deletedItemsController.postRestoreProduct
);

module.exports = router;
