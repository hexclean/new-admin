const { body } = require("express-validator/check");
const express = require("express");
const adminController = require("../controllers/admin");
const adminDailyMenuController = require("../controllers/daily-menu");
const adminProfileController = require("../controllers/profile");
const adminOrderController = require("../controllers/orders");
const adminCouponController = require("../controllers/coupon");
const isAuth = require("../../middleware/is-auth");
const router = express.Router();



// /admin/add-product
router.get("/add-product", isAuth, adminController.getAddProduct);

// /admin/products
router.get("/products", isAuth, adminController.getProducts);

// /admin/add-product
router.post(
  "/add-product",

  [
    body("roTitle")
      .isString()
      .isLength({ min: 3 })
      .trim(),
    body("huTitle")
      .isString()
      .isLength({ min: 3 })
      .trim(),
    body("enTitle")
      .isString()
      .isLength({ min: 3 })
      .trim(),
    body("price").isFloat(),
    body("roDescription")
      .isLength({ min: 5, max: 400 })
      .trim(),
    body("huDescription")
      .isLength({ min: 5, max: 400 })
      .trim(),
    body("enDescription")
      .isLength({ min: 5, max: 400 })
      .trim(),
      
  ],

  isAuth,
  adminController.postAddProduct
);
router.get("/edit-product/:productId", isAuth, adminController.getEditProduct);
router.post("/edit-product",[
  body("roTitle")
    .isString()
    .isLength({ min: 3 })
    .trim(),
  body("huTitle")
    .isString()
    .isLength({ min: 3 })
    .trim(),
  body("enTitle")
    .isString()
    .isLength({ min: 3 })
    .trim(),
  body("price").isFloat(),
  body("roDescription")
    .isLength({ min: 5, max: 400 })
    .trim(),
  body("huDescription")
    .isLength({ min: 5, max: 400 })
    .trim(),
  body("enDescription")
    .isLength({ min: 5, max: 400 })
    .trim(),
    
], isAuth, adminController.postEditProduct);
router.post("/delete-product", isAuth, adminController.postDeleteProduct);

router.post("/edit-profile", isAuth, adminProfileController.postEditProfile);
router.get("/edit-profile/:adminId", adminProfileController.getEditProfile);
router.get("/dashboard", isAuth, adminProfileController.getDashboard);
//
router.get("/add-photo", isAuth, adminProfileController.getDashboard2);
// /admin/add-product

router.get("/edit-photo/:adminId", isAuth, adminProfileController.getEditPhoto);
router.post("/edit-photo", isAuth, adminProfileController.postEditPhoto);

//ORDERS
router.get("/orders", isAuth, adminOrderController.getOrders);
router.get("/edit-order/:orderId", isAuth, adminOrderController.getEditOrder);
router.post("/edit-order", isAuth, adminOrderController.postEditOrder);
router.post("/delete-order", isAuth, adminOrderController.postDeleteOrder);
// DAILY MENU
router.get("/daily-menus", isAuth, adminDailyMenuController.getDailyMenu);
router.post(
  "/edit-daily-menu",
  isAuth,
  adminDailyMenuController.postEditDailyMenu
);

router.get("/add-daily-menu", isAuth, adminDailyMenuController.getAddDailyMenu);
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
router.get("/discounts", isAuth, adminCouponController.getCoupons);
router.get("/add-coupon", isAuth, adminCouponController.getAddCoupon);
router.post("/add-coupon", isAuth, adminCouponController.postAddCoupon);
// router.get(
//   "/edit-discount/:discountId",
//   isAuth,
//   adminCouponController.getEditProduct
// );
// router.post("/edit-discount", isAuth, adminCouponController.postEditProduct);
module.exports = router;
