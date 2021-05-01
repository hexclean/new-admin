const express = require("express");
const adminController = require("../controllers/products/products");
const propertyController = require("../controllers/products/subcategories");
const extraController = require("../controllers/products/extras");
const variantsController = require("../controllers/products/variants");
const faqController = require("../controllers/faq");
const categoryController = require("../controllers/products/categories");
const boxController = require("../controllers/products/boxes");
const couponController = require("../controllers/coupon");
const reviewController = require("../controllers/review");
const adminProfileController = require("../controllers/profile");
const allergenController = require("../controllers/products/allergens");
const deletedItemsController = require("../controllers/deleted-items");
const comboController = require("../controllers/combo");
const liveSearchController = require("../controllers/live-search");
const ordersController = require("../controllers/order");
const reckoningController = require("../controllers/reckoning");
const deliveryPriceController = require("../controllers/delivery-price");
const statisticController = require("../controllers/statistic");
const upsellController = require("../controllers/products/upsells");
const downsellController = require("../controllers/products/downsells");
const listsController = require("../controllers/lists");
const dailyMenuController = require("../controllers/products/daily-menus");
const isAuth = require("../../middleware/is-auth");
const router = express.Router();

// LISTS
router.get("/subcategories", isAuth, listsController.getSubcategories);
// Rendelések
router.get("/view-order/:orderId", isAuth, ordersController.getOrderDetail);
// Listák
router.get("/products", isAuth, listsController.getProducts);
router.get("/allergens", isAuth, listsController.getAllergenIndex);
router.get("/daily-menus", isAuth, listsController.getDailyMenu);
router.get("/downsells", isAuth, listsController.getDownsellProducts);
router.get("/upsells", isAuth, listsController.getUpsellProducts);
router.get("/deleted-products", isAuth, listsController.getDeletedProducts);
router.get("/categories", isAuth, listsController.getCategoryIndex);
router.get("/variants", isAuth, listsController.getVariantIndex);
router.get("/extras", isAuth, listsController.getExtraIndex);
router.get("/boxes", isAuth, listsController.getBoxIndex);
router.get("/order-list", isAuth, listsController.getOrders);

// Daily Menu
router.get("/add-daily-menu", isAuth, dailyMenuController.getAddDailyMenu);
router.post(
  "/add-daily-menu",
  isAuth,
  dailyMenuController.postAddDailyMenuProduct
);
router.get(
  "/edit-daily-menu/:productId",
  isAuth,
  dailyMenuController.getEditDailyMenu
);
router.post("/edit-daily-menu", isAuth, dailyMenuController.postEditDailyMenu);

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
  "/get-filtered-order/:orderId",
  isAuth,
  liveSearchController.getFilteredOrders
);

router.get(
  "/get-filtered-acc-order/:orderId",
  isAuth,
  liveSearchController.getFilteredAcceptedOrders
);

router.get(
  "/get-filtered-del-order/:orderId",
  isAuth,
  liveSearchController.getFilteredDeletedOrders
);

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

///
// router.get("/orders", isAuth, ordersController.getNewOrders);
// router.get("/orders", isAuth, ordersController.getPlacedOrders);

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
router.get(
  "/get-filtered-product/:productId",
  isAuth,
  liveSearchController.getFilteredProduct
);
router.get(
  "/get-filtered-upsell/:productId",
  isAuth,
  liveSearchController.getFilteredUpsell
);
router.get(
  "/get-filtered-downsell/:productId",
  isAuth,
  liveSearchController.getFilteredDownsell
);
router.get(
  "/get-filtered-daily-menu/:productId",
  isAuth,
  liveSearchController.getFilteredDailyMenu
);
router.get(
  "/get-filtered-deleted-product/:productId",
  isAuth,
  liveSearchController.getFilteredDeletedProduct
);
router.get(
  "/get-filtered-property/:propertyId",
  isAuth,
  liveSearchController.getFilteredProperty
);
// COMBO

// VARIANT
router.get("/add-variant", isAuth, variantsController.getAddVariant);
router.post("/add-variant", isAuth, variantsController.postAddVariant);
router.get(
  "/edit-variant/:variantId",
  isAuth,
  variantsController.getEditVariant
);

router.get(
  "/edit-variant/search-variant-category/:categoryId",
  isAuth,
  variantsController.getFilteredProperty
);
router.get(
  "/search-variant-category/:categoryId",
  isAuth,
  variantsController.getFilteredProperty
);
router.post("/edit-variant", isAuth, variantsController.postEditVariant);
// router.post("/delete-variant", isAuth, variantsController.postDeleteVariant);

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
router.post("/add-product", adminController.postAddProduct);
router.get("/edit-product/:productId", isAuth, adminController.getEditProduct);
router.post("/edit-product", isAuth, adminController.postEditProduct);
router.post("/delete-product", isAuth, adminController.postDeleteProduct);
router.post(
  "/delete-daily-menu",
  isAuth,
  dailyMenuController.postDeleteDailyMenu
);

// UPSELL
router.get("/add-upsell", isAuth, upsellController.getAddUpsellProduct);
router.post("/add-upsell", upsellController.postAddUpsellProduct);
router.get(
  "/edit-upsell/:productId",
  isAuth,
  upsellController.getEditUpsellProduct
);
router.post("/edit-upsell", isAuth, upsellController.postEditUpsellProduct);

// DOWNSELL
router.get("/add-downsell", isAuth, downsellController.getAddDownsellProduct);
router.post("/add-downsell", downsellController.postAddDownsellProduct);
router.get(
  "/edit-downsell/:productId",
  isAuth,
  downsellController.getEditDownsellProduct
);
router.post(
  "/edit-downsell",
  isAuth,
  downsellController.postEditDownsellProduct
);
router.post(
  "/delete-downsell",
  isAuth,
  downsellController.postDeleteDownsellProduct
);

router.post("/delete-upsell", isAuth, upsellController.postDeleteUpsellProduct);

// Profile

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

router.get("/dashboard", isAuth, adminProfileController.getDashboard);

// Allergen
// router.get("/allergen/search", isAuth, allergenController.getSearch);
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
router.post(
  "/restore-product",
  isAuth,
  deletedItemsController.postRestoreProduct
);

// Orders
router.get("/orders", isAuth, ordersController.getOrders);

// Reckoning
router.get("/reckoning", isAuth, reckoningController.getIndex);
router.post("/reckoning", isAuth, reckoningController.postExport);

// DELIVERY PRICES
router.get(
  "/edit-delivery-price",
  isAuth,
  deliveryPriceController.getEditDeliveryPrice
);
// UPSELL

router.post("/ajax/next", isAuth, ordersController.postEditOrderAjaxNext);
router.post("/ajax/prev", isAuth, ordersController.postEditOrderAjaxPrev);
router.get("/courier-orders", isAuth, ordersController.getOrdersByCourier);
router.post("/create-order", isAuth, ordersController.postAddOrder);
router.post(
  "/search-by-phone",
  isAuth,
  ordersController.getDeliveryAddressByPhone
);
router.post("/delete-order/:id", isAuth, ordersController.postDeleteOrder);
//
router.get("/statistic-orders", isAuth, statisticController.getStatistic);
router.post(
  "/statistic-orders-search",
  isAuth,
  statisticController.postStatistic
);

// router.post("/add-product", adminController.postAddProduct);
// router.get("/edit-product/:productId", isAuth, adminController.getEditProduct);
// router.post("/edit-product", isAuth, adminController.postEditProduct);
// router.post("/delete-product", isAuth, adminController.postDeleteProduct);
// router.post("/add-coupon", isAuth, couponController.postAddCoupon);
// router.get("/edit-coupon/:couponId", isAuth, couponController.getEditCoupon);
// router.post("/edit-coupon", isAuth, couponController.postEditCoupon);

module.exports = router;
