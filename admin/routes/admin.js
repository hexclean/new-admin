const express = require("express");
const adminController = require("../controllers/admin");
const propertyController = require("../controllers/property");
const extraController = require("../controllers/extra");
const variantsController = require("../controllers/variants");
const faqController = require("../controllers/faq");
const categoryController = require("../controllers/category");
const boxController = require("../controllers/box");
const couponController = require("../controllers/coupon");
const reviewController = require("../controllers/review");
const adminProfileController = require("../controllers/profile");
const allergenController = require("../controllers/allergen");
const deletedItemsController = require("../controllers/deleted-items");
const comboController = require("../controllers/combo");
const liveSearchController = require("../controllers/live-search");
const ordersController = require("../controllers/order");
const isAuth = require("../../middleware/is-auth");
const router = express.Router();

// PROPERTY
router.get("/add-property", isAuth, propertyController.getAddProperty);
router.post("/add-property", isAuth, propertyController.postAddProperty);
router.get(
  "/edit-property/:propertyId",
  isAuth,
  propertyController.getEditProperty
);
router.post("/edit-property", isAuth, propertyController.postEditProperty);

// LIVE SEARCH
router.get(
  "/get-filtered-category/:categoryId",
  isAuth,
  liveSearchController.getFilteredCategory
);
router.get(
  "/get-filtered-extra/:extraId",
  isAuth,
  liveSearchController.getFilteredExtra
);

router.get(
  "/get-filtered-allergen/:allergenId",
  isAuth,
  liveSearchController.getFilteredAllergen
);
router.get(
  "/get-filtered-box/:boxId",
  isAuth,
  liveSearchController.getFilteredBox
);
router.get(
  "/get-filtered-variant/:variantId",
  isAuth,
  liveSearchController.getFilteredVariant
);
// COMBO
router.get("/variant-index", isAuth, comboController.getVariantIndex);
router.get("/extra-index", isAuth, comboController.getExtraIndex);
router.get("/category-index", isAuth, comboController.getCategoryIndex);
router.get("/allergen-index", isAuth, comboController.getAllergenIndex);
router.get("/box-index", isAuth, comboController.getBoxIndex);

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
router.get(
  "/search-variant-extras/:extraId",
  isAuth,
  variantsController.getFilterExtras
);
router.post("/edit-variant", isAuth, variantsController.postEditVariant);
router.post("/delete-variant", isAuth, variantsController.postDeleteVariant);

// CATEGORY
router.get("/add-category", isAuth, categoryController.getAddCategory);
router.post("/add-category", isAuth, categoryController.postAddCategory);
router.get(
  "/edit-category/:categoryId",
  isAuth,
  categoryController.getEditCategory
);
router.post("/edit-category", isAuth, categoryController.postEditCategory);

// BOX
router.get("/add-box", isAuth, boxController.getAddBox);
router.post("/add-box", isAuth, boxController.postAddBox);
router.get("/edit-box/:boxId", isAuth, boxController.getEditBox);
router.post("/edit-box", isAuth, boxController.postEditBox);

// COUPON CODE
router.get("/add-coupon", isAuth, couponController.getAddCoupon);
router.post("/add-coupon", isAuth, couponController.postAddCoupon);
router.get("/edit-coupon/:couponId", isAuth, couponController.getEditCoupon);
router.post("/edit-coupon", isAuth, couponController.postEditCoupon);

// EXTRA
router.get("/add-extra", isAuth, extraController.getAddExtra);
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
router.get(
  "/get-category-variants/:categoryId",
  isAuth,
  adminController.getCategoryVariants
);

// Profile
router.get(
  "/edit-opening-hours/:restaurantId",
  adminProfileController.getEditOpeningHours
);
router.post(
  "/edit-opening-hours",
  isAuth,
  adminProfileController.postEditOpeningHours
);

router.get(
  "/edit-profile-image/:restaurantId",
  adminProfileController.getEditProfileImages
);

router.post(
  "/edit-profile-image",
  isAuth,
  adminProfileController.postEditProfileImages
);

router.get(
  "/edit-cover-image/:restaurantId",
  adminProfileController.getEditCoverImages
);

router.post(
  "/edit-cover-image",
  isAuth,
  adminProfileController.postEditCoverImages
);

router.post("/edit-profile", isAuth, adminProfileController.postEditProfile);

router.get(
  "/edit-profile/:restaurantId",
  adminProfileController.getEditProfile
);
router.get("/dashboard", isAuth, adminProfileController.getDashboard);

// Allergen
router.get("/allergen/search", isAuth, allergenController.getSearch);
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

// Review
router.get("/products-reviews", isAuth, reviewController.getProductsReview);

// Orders
router.get("/orders", isAuth, ordersController.getOrders);
router.get("/accepted-orders", isAuth, ordersController.getAcceptedOrders);
router.get("/deleted-orders", isAuth, ordersController.getDeletedOrders);
router.get("/edit-order/:orderId", isAuth, ordersController.getEditOrder);
router.post("/edit-order", isAuth, ordersController.postEditOrder);
module.exports = router;
