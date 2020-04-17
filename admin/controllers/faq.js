exports.getIndex = async (req, res, next) => {
  res
    .render("faq/index", {
      pageTitle: "Admin Products",
      path: "/admin/products",
    })

    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};
