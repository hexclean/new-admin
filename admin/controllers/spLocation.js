exports.getAddAllergen = (req, res, next) => {
  res.render("super-admin/location/edit-location", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
  });
};
