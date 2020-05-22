const fileHelper = require("../../util/file");
const Admin = require("../../models/Admin");
const AdminInfo = require("../../models/AdminInfo");
const OpeningHours = require("../../models/AdminOpeningHours");
const OpeningHoursTranslation = require("../../models/AdminOpeningHoursTranslation");

exports.getEditProfile = async (req, res, next) => {
  adminId = req.admin.id;
  adminIdParams = req.params.adminId;
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
  adminId = req.admin.id;
  adminIdParams = req.params.adminId;
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }

  await Admin.findAll({
    // where: { id: req.admin.id },
    include: [
      {
        model: OpeningHours,
      },
      {
        model: OpeningHoursTranslation,
      },
    ],
  })
    .then((admin) => {
      console.log("admin", admin);
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
        where: { adminId: req.admin.id },
      },
    ],
  })
    .then((admin) => {
      // console.log("req.adminid", req.admin.id);
      // console.log(admin);
      // if (extra.adminId != req.admin.id) {
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
          { where: { adminId: req.admin.id, languageId: 1 } }
        );

        await AdminInfo.update(
          { shortCompanyDesc: huShortCompanyDesc, adress: huAdress },
          { where: { adminId: req.admin.id, languageId: 2 } }
        );

        await AdminInfo.update(
          { shortCompanyDesc: enShortCompanyDesc, adress: enAdress },
          { where: { adminId: req.admin.id, languageId: 3 } }
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
  const adminId = req.admin.id;

  Admin.findByPk(adminId)
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
