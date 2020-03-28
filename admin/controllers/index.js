const Order = require("../../models/Orders");
const Product = require("../../models/Product");
const Admin = require("../../models/Admin");

exports.indexController = (req, res, next) => {
  Order.find({ product: req.admin._id })
    .then(products => {
      res.render("profile/dashboard", {
        prods: products,
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
