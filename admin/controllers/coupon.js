const fileHelper = require("../../util/file");
const { validationResult } = require("express-validator/check");
const Coupon = require("../../models/Coupon");

exports.getAddCoupon = (req, res, next) => {
  res.render("coupon/edit-coupon", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
    hasError: false,
    errorMessage: null,
    validationErrors: []
  });
};

exports.postAddCoupon = async (req, res, next) => {
  const name = req.body.name;
  const discount = req.body.discount;
  
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log(errors.array());
    return res.status(422).render("coupon/edit-coupon", {
      pageTitle: "Add Product",
      path: "/admin/add-product",
      editing: false,
      hasError: true,
      coupon: {
        name: name,
        discount: discount
      },
      errorMessage: errors.array()[0].msg,
      validationErrors: errors.array()
    });
  }

  await Coupon.create({
    adminId: req.admin,
    discount: discount,
    name: name
  })
    .then(result => {
      console.log("Created Product");
      res.redirect("/admin/discount-list");
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getCoupons = (req, res, next) => {
  Coupon.find({ adminId: req.admin._id })
    .then(coupon => {
      var currentLanguage = req.cookies.language;
      res.render("coupon/coupon-list", {
        cp: coupon,
        currentLanguage: currentLanguage,
        pageTitle: "Admin Products",
        path: "/admin/products"
      });
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};
