const Order = require("../../models/Orders");
const Product = require("../../models/Product");
const Admin = require("../../models/Admin");

exports.indexController = (req, res, next) => {
  const adminId = req.admin._id;
  Admin.findById(adminId)
    .then(admin => {
      if (!admin) {
        return res.redirect("/admin/products");
      }
      res.render("profile/dashboard", {
        pageTitle: "Edit admin",

        path: "/admin/edit-admin",
        admin: admin
      });
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};
