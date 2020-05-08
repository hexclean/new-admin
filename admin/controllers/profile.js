const { validationResult } = require("express-validator/check");
const Admin = require("../../models/Admin");
const AdminInfo = require("../../models/AdminInfo");

exports.getEditProfile = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }

  Admin.findAll({
    include: [
      {
        model: AdminInfo,
        where: { adminId: req.admin.id },
      },
    ],
  })
    .then((admin) => {
      // if (admin.id != req.admin.id) {
      //   return res.redirect("/admin/products");
      // }
      for (let i = 0; i <= admin.length; i++) {
        // console.log(admin[i].adminInfos[0].adress);
      }
      // console.log(admin);
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

exports.postEditProfile = async (req, res, next) => {
  const adminId = req.body.adminId;
  const fullName = req.body.fullName;
  const phoneNumber = req.body.phoneNumber;
  const open = req.body.open;
  const close = req.body.close;
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
      // console.log(extra);
      // if (extra.adminId != req.admin.id) {
      //   return res.redirect("/");
      // }
      console.log(admin);
      async function msg() {
        await Admin.update(
          {
            phoneNumber: phoneNumber,
            open: open,
            close: close,
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

  console.log("adminId", adminId);
  console.log("req.admin.id", req.admin.id);
  Admin.findByPk(adminId)
    .then((admin) => {
      if (!admin) {
        return res.redirect("/admin/products");
      }
      console.log(admin);
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
