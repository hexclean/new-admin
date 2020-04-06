const { body } = require("express-validator/check");
const express = require("express");
const adminController = require("../controllers/admin");
const adminDailyMenuController = require("../controllers/daily-menu");
const adminProfileController = require("../controllers/profile");
const adminOrderController = require("../controllers/orders");
const adminCouponController = require("../controllers/coupon");
const adminCostsController = require("../controllers/cost");
const adminExtraController = require("../controllers/extra");
const adminUsersController = require("../controllers/admin-users");

const isAuth = require("../../middleware/is-auth");
const router = express.Router();

//
router.get("/users", adminUsersController.getOrders);
router.get("/extras", adminController.getExtras);
router.post("/add-extra", adminExtraController.postAddExtra);
router.get("/add-extra", adminExtraController.getAddExtra);
router.get("/edit-extra/:extraId", adminExtraController.getEditExtra);
///
router.get("/edit-order/:orderId", adminUsersController.getEditOrder);

// /admin/add-product
router.get("/add-product", adminController.getAddProduct);

// /admin/products
router.get("/products", adminController.getProducts);

// /admin/add-product
router.post(
  "/add-product",

  adminController.postAddProduct
);
router.get("/edit-product/:productId", adminController.getEditProduct);

router.get("/search", adminController.getSearchProduct);

router.get("/search-user", adminUsersController.getSearchUsers);

router.get(
  "/autocomplete/",
  isAuth,
  adminUsersController.getUsersSearchedInput
);

router.post(
  "/edit-product",
  [
    body("roTitle").isString().isLength({ min: 3 }).trim(),
    body("huTitle").isString().isLength({ min: 3 }).trim(),
    body("enTitle").isString().isLength({ min: 3 }).trim(),
    body("price").isFloat(),
    body("roDescription").isLength({ min: 5, max: 400 }).trim(),
    body("huDescription").isLength({ min: 5, max: 400 }).trim(),
    body("enDescription").isLength({ min: 5, max: 400 }).trim(),
  ],
  isAuth,
  adminController.postEditProduct
);
router.post("/delete-product", adminController.postDeleteProduct);

router.post("/edit-profile", adminProfileController.postEditProfile);
router.get("/edit-profile/:adminId", adminProfileController.getEditProfile);
router.get("/dashboard", adminProfileController.getDashboard);
//
router.get("/add-photo", adminProfileController.getDashboard2);
// /admin/add-product

router.get("/edit-photo/:adminId", adminProfileController.getEditPhoto);
router.post("/edit-photo", adminProfileController.postEditPhoto);

//ORDERS
router.get("/orders", adminOrderController.getOrders);
router.get("/edit-order/:orderId", adminOrderController.getEditOrder);
router.post("/edit-order", adminOrderController.postEditOrder);
router.post("/delete-order", adminOrderController.postDeleteOrder);
// DAILY MENU
router.get("/daily-menus", adminDailyMenuController.getDailyMenu);
router.post(
  "/edit-daily-menu",
  isAuth,
  adminDailyMenuController.postEditDailyMenu
);
router.post("/delete-daily-menu", adminController.postDeleteDailyMenu);

router.get("/add-daily-menu", adminDailyMenuController.getAddDailyMenu);
router.post(
  "/add-daily-menu",
  isAuth,
  adminDailyMenuController.postAddDailyMenu
);
router.get(
  "/edit-daily-menu/:productId",
  isAuth,
  adminDailyMenuController.getEditDailyMenu
);

// DISCOUNT
router.get("/discounts", adminCouponController.getCoupons);
router.get("/add-coupon", adminCouponController.getAddCoupon);
router.post("/add-coupon", adminCouponController.postAddCoupon);
// router.get(
//   "/edit-discount/:discountId",
//   isAuth,
//   adminCouponController.getEditProduct
// );
// router.post("/edit-discount", adminCouponController.postEditProduct);

router.get("/costs", adminCostsController.getCoupons);
router.get("/add-cost", adminCostsController.getAddCost);
router.post("/add-cost", adminCostsController.postAddCost);

module.exports = router;
