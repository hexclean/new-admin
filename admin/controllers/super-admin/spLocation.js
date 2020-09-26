const Location = require("../../../models/Location");
const LocationTranslation = require("../../../models/LocationName");

exports.getLocations = (req, res, next) => {
  Location.findAll({
    include: [
      {
        model: LocationTranslation,
      },
    ],
  })
    .then((location) => {
      res.render("super-admin/location/locations", {
        loc: location,
        pageTitle: "Admin Products",
        path: "/admin/products",
      });
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getAddLocation = (req, res, next) => {
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
      res.redirect("/super-admin/locations");
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getEditLocation = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }

  const locId = req.params.locationId;

  Location.findAll({
    where: { id: locId },
    include: [
      {
        model: LocationTranslation,
      },
    ],
  })
    .then((location) => {
      res.render("super-admin/location/edit-location", {
        pageTitle: "Edit Product",
        path: "/admin/edit-product",
        editing: editMode,
        locationId: locId,
        location: location,
      });
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.postEditLocation = async (req, res, next) => {
  const locId = req.body.locationId;
  // Title
  const updatedRoTitle = req.body.roName;
  const updatedHuTitle = req.body.huName;
  const updatedEnTitle = req.body.enName;

  Location.findAll({
    include: [
      {
        model: LocationTranslation,
      },
    ],
  })
    .then((result) => {
      async function updateLocationName() {
        await LocationTranslation.update(
          {
            name: updatedRoTitle,
          },
          { where: { adminLocationId: locId, languageId: 1 } }
        );

        await LocationTranslation.update(
          {
            name: updatedHuTitle,
          },
          { where: { adminLocationId: locId, languageId: 2 } }
        );

        await LocationTranslation.update(
          {
            name: updatedEnTitle,
          },
          { where: { adminLocationId: locId, languageId: 3 } }
        );
      }
      updateLocationName();
      res.redirect("/super-admin/locations");
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};
