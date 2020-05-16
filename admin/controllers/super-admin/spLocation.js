const Location = require("../../../models/AdminLocation");
const LocationTranslation = require("../../../models/AdminLocationTranslation");

exports.getAddAllergen = (req, res, next) => {
  res.render("super-admin/location/edit-location", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
  });
};

exports.postAddLocation = async (req, res, next) => {
  const roName = req.body.roName;
  const huName = req.body.huName;
  const enName = req.body.enName;

  const location = await Location.create();

  async function extraTransaltion() {
    await LocationTranslation.create({
      name: roName,
      languageId: 1,
      adminLocationId: location.id,
    });
    await LocationTranslation.create({
      name: huName,
      languageId: 2,
      adminLocationId: location.id,
    });

    await LocationTranslation.create({
      name: enName,
      languageId: 3,
      adminLocationId: location.id,
    });
  }

  extraTransaltion()
    .then((result) => {
      res.redirect("/super-admin/add-location");
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};
