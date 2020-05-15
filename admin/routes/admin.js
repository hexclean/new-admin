const { body } = require("express-validator/check");
const express = require("express");
const adminController = require("../controllers/admin");
const extraController = require("../controllers/extra");
const variantsController = require("../controllers/variants");
const faqController = require("../controllers/faq");
const categoryController = require("../controllers/category");
const adminProfileController = require("../controllers/profile");
const dailyMenuController = require("../controllers/daily-menu");
const allergenController = require("../controllers/allergen");

// const migrationController = require("../controllers/migration");
// const adminProfileController = require("../controllers/profile");
// const adminOrderController = require("../controllers/orders");
// const adminCouponController = require("../controllers/coupon");
// const adminCostsController = require("../controllers/cost");
// const adminExtraController = require("../controllers/extra");
// const adminUsersController = require("../controllers/admin-users");

const isAuth = require("../../middleware/is-auth");
const router = express.Router();
///

// router.get("/step-one", isAuth, migrationController.getIndex);
// router.get("/import-extras", isAuth, migrationController.getAddExtra);
// router.post(
//   "/import-extras",

//   migrationController.postAddExtra
// );

//
// router.get("/users", adminUsersController.getOrders);
// router.get("/extras", extraController.getExtras);
// router.post("/add-extra", adminExtraController.postAddExtra);
// router.get("/add-extra", adminExtraController.getAddExtra);
// router.get("/edit-extra/:extraId", adminExtraController.getEditExtra);
///
// router.get("/edit-order/:orderId", adminUsersController.getEditOrder);

router.get("/faq-index", isAuth, faqController.getIndex);
router.get("/vr-index", isAuth, variantsController.getIndex);
// router.get("/search-extr-by-keyword", variantsController.searchExtraByKeyword);
router.get("/add-variant", isAuth, variantsController.getAddVariant);
router.post("/add-variant", isAuth, variantsController.postAddVariant);

router.get(
  "/edit-variant/:variantId",
  isAuth,
  variantsController.getEditVariant
);

router.post(
  "/edit-variant",
  isAuth,

  variantsController.postEditVariant
);
router.post("/delete-variant", variantsController.postDeleteVariant);
///

router.get("/add-category", isAuth, categoryController.getAddCategory);
router.post("/add-category", isAuth, categoryController.postAddCategory);
router.get(
  "/edit-category/:categoryId",
  isAuth,
  categoryController.getEditCategory
);
router.post(
  "/edit-category",
  isAuth,

  categoryController.postEditCategory
);

///
router.get("/add-extra", isAuth, extraController.getAddExtra);
router.get("/extras", isAuth, extraController.getExtras);
router.get("/edit-extra/:extraId", isAuth, extraController.getEditExtra);
router.post(
  "/edit-extra",
  isAuth,

  extraController.postEditExtra
);
router.post("/add-extra", isAuth, extraController.postAddExtra);
// /admin/add-product
router.get("/add-product", isAuth, adminController.getAddProduct);

// /admin/products
router.get("/products", isAuth, adminController.getProducts);

// /admin/add-product
router.post(
  "/add-product",

  adminController.postAddProduct
);
router.get("/edit-product/:productId", isAuth, adminController.getEditProduct);
router.post("/edit-product", isAuth, adminController.postEditProduct);

// router.get("/search", adminController.getSearchProduct);

// router.get("/search-user", adminUsersController.getSearchUsers);

// router.get(
//   "/autocomplete/",
//   isAuth,
//   adminUsersController.getUsersSearchedInput
// );

router.post(isAuth, adminController.postEditProduct);
router.post("/delete-product", isAuth, adminController.postDeleteProduct);

// router.post("/edit-profile", adminProfileController.postEditProfile);
// router.get("/edit-profile/:adminId", adminProfileController.getEditProfile);
// router.get("/dashboard", adminProfileController.getDashboard);
// //
// router.get("/add-photo", adminProfileController.getDashboard2);
// // /admin/add-product

// router.get("/edit-photo/:adminId", adminProfileController.getEditPhoto);
// router.post("/edit-photo", adminProfileController.postEditPhoto);

//ORDERS
// router.get("/orders", adminOrderController.getOrders);
// router.get("/edit-order/:orderId", adminOrderController.getEditOrder);
// router.post("/edit-order", adminOrderController.postEditOrder);
// router.post("/delete-order", adminOrderController.postDeleteOrder);
// // DAILY MENU
// router.get("/daily-menus", adminDailyMenuController.getDailyMenu);
// router.post(
//   "/edit-daily-menu",
//   isAuth,
//   adminDailyMenuController.postEditDailyMenu
// );
router.post("/delete-daily-menu", isAuth, adminController.postDeleteDailyMenu);

// router.get("/add-daily-menu", adminDailyMenuController.getAddDailyMenu);
// router.post(
//   "/add-daily-menu",
//   isAuth,
//   adminDailyMenuController.postAddDailyMenu
// );
// router.get(
//   "/edit-daily-menu/:productId",
//   isAuth,
//   adminDailyMenuController.getEditDailyMenu
// );

// // DISCOUNT
// router.get("/discounts", adminCouponController.getCoupons);
// router.get("/add-coupon", adminCouponController.getAddCoupon);
// router.post("/add-coupon", adminCouponController.postAddCoupon);
// // router.get(
// //   "/edit-discount/:discountId",
// //   isAuth,
// //   adminCouponController.getEditProduct
// // );
// // router.post("/edit-discount", adminCouponController.postEditProduct);

// router.get("/costs", adminCostsController.getCoupons);
// router.get("/add-cost", adminCostsController.getAddCost);
// router.post("/add-cost", adminCostsController.postAddCost);
router.post("/edit-profile", isAuth, adminProfileController.postEditProfile);
router.get("/edit-profile/:adminId", adminProfileController.getEditProfile);
router.get("/dashboard", isAuth, adminProfileController.getDashboard);

// Daily Menu
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

// router.post("/delete-variant", dailyMenuController.postDeleteVariant);
module.exports = router;
