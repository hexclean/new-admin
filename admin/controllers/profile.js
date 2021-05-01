const Admin = require("../../models/Restaurant");
const RestaurantInfo = require("../../models/RestaurantInfo");
const fileHelper = require("../../util/file");
const Hours = require("../../models/Hours.js");
const OpeningHours = require("../../models/OpeningHours");
const OpeningHoursTranslation = require("../../models/OpeningHoursTranslation");

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
  await updateOpeningHours();
  return res.redirect("/admin/dashboard");
};

exports.postEditProfile = async (req, res, next) => {
  const fullName = req.body.fullName;
  const phoneNumber = req.body.phoneNumber;
  const roAdress = req.body.roAdress;
  const huAdress = req.body.huAdress;
  const email = req.body.email;
  const roShortCompanyDesc = req.body.roShortCompanyDesc;
  const huShortCompanyDesc = req.body.huShortCompanyDesc;
  const enShortCompanyDesc = req.body.enShortCompanyDesc;
  const city = req.body.city;
  const village = req.body.village;
  let restaurantId = req.admin.id;
  try {
    async function updateProfile() {
      await Admin.update(
        {
          phoneNumber: phoneNumber,
          deliveryPriceVillage: village,
          deliveryPriceCity: city,
          fullName: fullName,
          email: email,
        },
        { where: { id: restaurantId } }
      );

      await RestaurantInfo.update(
        { shortCompanyDesc: roShortCompanyDesc, address: roAdress },
        { where: { restaurantId: restaurantId, languageId: 1 } }
      );

      await RestaurantInfo.update(
        { shortCompanyDesc: huShortCompanyDesc, address: huAdress },
        { where: { restaurantId: restaurantId, languageId: 2 } }
      );

      await RestaurantInfo.update(
        { shortCompanyDesc: enShortCompanyDesc, address: roAdress },
        { where: { restaurantId: restaurantId, languageId: 3 } }
      );
    }
    await updateProfile();

    res.redirect("/admin/dashboard");
  } catch (err) {
    const error = new Error(err);
    error.httpStatusCode = 500;
    return next(error);
  }
};

exports.getDashboard = async (req, res, next) => {
  const editMode = req.query.edit;
  const restaurantId = req.admin.id;

  const admin = await Admin.findAll({
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
  });
  const admins = await Admin.findAll({
    where: { id: req.admin.id },
    include: [{ model: RestaurantInfo }],
  });
  console.log(admins[0].RestaurantInfos);
  // Admin.findByPk(restaurantId)
  // .then((admin) => {
  //   if (!admin) {
  //     return res.redirect("/admin/products");
  //   }

  res.render("profile/dashboard", {
    pageTitle: "Edit admin",
    editing: editMode,
    path: "/admin/edit-admin",
    admin: admin,
    admins: admins,
  });
  // })
  // .catch((err) => {
  //   const error = new Error(err);
  //   error.httpStatusCode = 500;
  //   return next(error);
  // });
};

exports.getEditProfileImages = (req, res, next) => {
  const editMode = req.query.edit;
  const restaurantId = req.admin.id;
  Admin.findByPk(restaurantId)
    .then((admin) => {
      if (!admin) {
        return res.redirect("/admin/products");
      }
      res.render("profile/edit-profile-image", {
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

exports.postEditProfileImages = async (req, res, next) => {
  const image = req.file;
  const profileImage = image.path;

  try {
    await Admin.findByPk(req.admin.id).then((restaurant) => {
      Admin.update(
        {
          profileImage: profileImage,
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

exports.getEditCoverImages = (req, res, next) => {
  const editMode = req.query.edit;
  const restaurantId = req.admin.id;

  Admin.findByPk(restaurantId)
    .then((admin) => {
      if (!admin) {
        return res.redirect("/admin/products");
      }
      res.render("profile/edit-cover-image", {
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

exports.postEditCoverImages = async (req, res, next) => {
  const image = req.file;
  const coverImage = image.path;

  try {
    await Admin.findByPk(req.admin.id).then((restaurant) => {
      Admin.update(
        {
          coverImage: coverImage,
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
