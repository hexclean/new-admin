const Admin = require("../../models/Restaurant");
const AdminInfo = require("../../models/AdminInfo");
const fileHelper = require("../../util/file");
const Hours = require("../../models/Hours.js");
const OpeningHours = require("../../models/OpeningHours");
const OpeningHoursTranslation = require("../../models/OpeningHoursTranslation");

exports.getEditProfile = async (req, res, next) => {
  restaurantId = req.admin.id;
  adminIdParams = req.params.restaurantId;
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }

  await Admin.findAll({
    where: { id: req.admin.id },
    include: [
      {
        model: AdminInfo,
      },
    ],
  })
    .then((admin) => {
      res.render("profile/edit-profile", {
        pageTitle: "Edit Product",
        path: "/admin/edit-product",
        editing: editMode,
        admin: admin,
        hasError: false,
        errorMessage: null,
        validationErrors: [],
      });
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getEditOpeningHours = async (req, res, next) => {
  const adminIdParams = req.params.restaurantId;
  const restaurantId = req.admin.id;

  const editMode = req.query.edit;

  if (adminIdParams != restaurantId) {
    return res.redirect("/");
  }

  if (!editMode) {
    return res.redirect("/");
  }

  await Admin.findAll({
    where: { id: req.admin.id },
    include: [
      {
        model: Hours,
        include: [
          {
            model: OpeningHours,
            include: [
              {
                model: OpeningHoursTranslation,
              },
            ],
          },
        ],
      },
    ],
  })
    .then((admin) => {
      res.render("profile/edit-opening-hours", {
        pageTitle: "Edit Product",
        path: "/admin/edit-product",
        editing: editMode,
        admin: admin,
      });
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.postEditOpeningHours = async (req, res, next) => {
  const mondayOpen = req.body.mondayOpen;
  const mondayClose = req.body.mondayClose;
  const tuesdayOpen = req.body.tuesdayOpen;
  const tuesdayClose = req.body.tuesdayClose;
  const wednesdayOpen = req.body.wednesdayOpen;
  const wednesdayClose = req.body.wednesdayClose;
  const thursdayOpen = req.body.thursdayOpen;
  const thursdayClose = req.body.thursdayClose;
  const fridayOpen = req.body.fridayOpen;
  const fridayClose = req.body.fridayClose;
  const saturdayOpen = req.body.saturdayOpen;
  const saturdayClose = req.body.saturdayClose;
  const sundayOpen = req.body.sundayOpen;
  const sundayClose = req.body.sundayClose;

  // if (extra.restaurantId != req.admin.id) {
  //   return res.redirect("/");
  // }
  async function updateOpeningHours() {
    await OpeningHours.update(
      {
        open: mondayOpen,

        close: mondayClose,
      },
      {
        where: {
          restaurantId: req.admin.id,
          sku: "hetfo",
        },
      }
    );

    await OpeningHours.update(
      {
        open: tuesdayOpen,

        close: tuesdayClose,
      },
      {
        where: {
          restaurantId: req.admin.id,
          sku: "kedd",
        },
      }
    );

    await OpeningHours.update(
      {
        open: wednesdayOpen,

        close: wednesdayClose,
      },
      {
        where: {
          restaurantId: req.admin.id,
          sku: "szerda",
        },
      }
    );

    await OpeningHours.update(
      {
        open: thursdayOpen,

        close: thursdayClose,
      },
      {
        where: {
          restaurantId: req.admin.id,
          sku: "csutortok",
        },
      }
    );

    await OpeningHours.update(
      {
        open: fridayOpen,

        close: fridayClose,
      },
      {
        where: {
          restaurantId: req.admin.id,
          sku: "pentek",
        },
      }
    );

    await OpeningHours.update(
      {
        open: saturdayOpen,

        close: saturdayClose,
      },
      {
        where: {
          restaurantId: req.admin.id,
          sku: "szombat",
        },
      }
    );

    await OpeningHours.update(
      {
        open: sundayOpen,

        close: sundayClose,
      },
      {
        where: {
          restaurantId: req.admin.id,
          sku: "vasarnap",
        },
      }
    );
  }
  updateOpeningHours();
  return res.redirect("/admin/dashboard");
};

exports.postEditProfile = async (req, res, next) => {
  const fullName = req.body.fullName;
  const phoneNumber = req.body.phoneNumber;
  const roAdress = req.body.roAdress;
  const huAdress = req.body.huAdress;
  const enAdress = req.body.enAdress;
  const roShortCompanyDesc = req.body.roShortCompanyDesc;
  const huShortCompanyDesc = req.body.huShortCompanyDesc;
  const enShortCompanyDesc = req.body.enShortCompanyDesc;

  Admin.findAll({
    include: [
      {
        model: AdminInfo,
        where: { restaurantId: req.admin.id },
      },
    ],
  })
    .then((admin) => {
      // if (extra.restaurantId != req.admin.id) {
      //   return res.redirect("/");
      // }
      async function msg() {
        await Admin.update(
          {
            phoneNumber: phoneNumber,

            fullName: fullName,
          },
          { where: { id: req.admin.id } }
        );

        await AdminInfo.update(
          { shortCompanyDesc: roShortCompanyDesc, adress: roAdress },
          { where: { restaurantId: req.admin.id, languageId: 1 } }
        );

        await AdminInfo.update(
          { shortCompanyDesc: huShortCompanyDesc, adress: huAdress },
          { where: { restaurantId: req.admin.id, languageId: 2 } }
        );

        await AdminInfo.update(
          { shortCompanyDesc: enShortCompanyDesc, adress: enAdress },
          { where: { restaurantId: req.admin.id, languageId: 3 } }
        );
      }
      msg();

      res.redirect("/admin/dashboard");
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getDashboard = (req, res, next) => {
  const editMode = req.query.edit;
  const restaurantId = req.admin.id;

  Admin.findByPk(restaurantId)
    .then((admin) => {
      if (!admin) {
        return res.redirect("/admin/products");
      }
      res.render("profile/dashboard", {
        pageTitle: "Edit admin",
        editing: editMode,
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

exports.getEditImages = (req, res, next) => {
  const editMode = req.query.edit;
  const restaurantId = req.admin.id;

  Admin.findByPk(restaurantId)
    .then((admin) => {
      if (!admin) {
        return res.redirect("/admin/products");
      }
      res.render("profile/edit-photo", {
        pageTitle: "Edit admin",
        editing: editMode,
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

exports.postEditImages = async (req, res, next) => {
  const image = req.file;
  const imageUrl = image.path;

  try {
    await Admin.findByPk(req.admin.id).then((restaurant) => {
      Admin.update(
        {
          imageUrl: imageUrl,
        },
        { where: { id: req.admin.id } }
      );

      res.redirect("/admin/dashboard");
    });
  } catch (err) {
    const error = new Error(err);
    error.httpStatusCode = 500;
    return next(error);
  }
};
