const Admin = require("../../models/Restaurant");

exports.indexController = (req, res, next) => {
  const restaurantId = req.admin.id;
  Admin.findByPk(restaurantId)
    .then((admin) => {
      if (!admin) {
        return res.redirect("/admin/products");
      }
      res.render("profile/dashboard", {
        pageTitle: "Edit admin",

        path: "/admin/edit-admin",
        admin: admin,
      });
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};
