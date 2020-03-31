const Costs = require("../../models/Cost");
const { validationResult } = require("express-validator/check");

exports.getCoupons = (req, res, next) => {
  Costs.find({ adminId: req.admin._id })
    .then(cost => {
      var currentLanguage = req.cookies.language;
      res.render("cost/costs", {
        cst: cost,
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

exports.getAddCost = (req, res, next) => {
  res.render("cost/edit-cost", {
    pageTitle: "Add Product",
    path: "/admin/edit-cost",
    editing: false,
    hasError: false,
    errorMessage: null,
    validationErrors: []
  });
};

exports.postAddCost = async (req, res, next) => {
  const roName = req.body.roName;
  const huName = req.body.huName;

  const enName = req.body.roName;

  const price = req.body.price;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log(errors.array());
    return res.status(422).render("cost/edit-cost", {
      pageTitle: "Add Product",
      path: "/admin/add-product",
      editing: false,
      hasError: true,
      coupon: {
        name: name,
        price: price
      },
      errorMessage: errors.array()[0].msg,
      validationErrors: errors.array()
    });
  }

  await Costs.create({
    adminId: req.admin,
    price: price,
    name: { en: enName, hu: huName, ro: roName }
  })
    .then(result => {
      console.log("Created Product");
      res.redirect("/admin/dashboard");
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};
