const { validationResult } = require("express-validator/check");
const Admin = require("../../models/Admin");
const AdminInfo = require("../../models/AdminInfo");

exports.getEditProfile = (req, res, next) => {
  const adminId = req.admin.id;
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }

  Admin.findByPk(adminId)
    .then((admin) => {
      if (admin.id != req.admin.id) {
        return res.redirect("/admin/products");
      }
      for (let i = 0; i <= admin.length; i++) {
        console.log(admin[i].id);
      }
      console.log(admin);
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

// exports.postEditProfile = async (req, res, next) => {
//   const adminId = req.body.adminId;
//   const fullName = req.body.fullName;
//   const phoneNumber = req.body.phoneNumber;
//   const open = req.body.open;
//   const close = req.body.close;
//   const roAdress = req.body.roAdress;
//   const huAdress = req.body.huAdress;
//   const enAdress = req.body.enAdress;
//   const roShortCompanyDesc = req.body.roShortCompanyDesc;
//   const huShortCompanyDesc = req.body.huShortCompanyDesc;
//   const enShortCompanyDesc = req.body.enShortCompanyDesc;
//   console.log(open);
//   console.log(adminId);
//   async function msg() {
//     var values = { title: "some title", content: "P" };
//     var condition = { where: { id: 2 } };
//     options = { multi: true };

//     AdminInfo.update(values, condition, options).then(function (upresult) {});

//     await Admin.findByPk(adminId).then((admin) => {
//       admin.phoneNumber = phoneNumber;
//       admin.open = open;
//       admin.close = close;
//       admin.fullName = fullName;
//       return admin.save();
//     });
//     await AdminInfo.update({
//       where: {
//         adminId: req.admin.id,
//         languageId: 1,
//       },
//     }).then((admin) => {
//       admin.adress = roAdress;
//       admin.companyDescription = roShortCompanyDesc;
//       admin.fullName = fullName;
//       return admin.save();
//     });
//     //   { adress: roAdress },
//     //   { companyDescription: roShortCompanyDesc },
//     //   { where: { adminId: adminId, languageId: 1 } }
//     // );
//     // await AdminInfo.update(
//     //   { adress: huAdress },
//     //   { companyDescription: huShortCompanyDesc },
//     //   { where: { adminId: adminId, languageId: 2 } }
//     // );
//     // await AdminInfo.update(
//     //   { adress: enAdress },
//     //   { companyDescription: enShortCompanyDesc },
//     //   { where: { adminId: adminId, languageId: 3 } }
//     // );
//   }
//   msg();
//   res.redirect("/admin/dashboard");
//   // .catch((err) => {
//   //   const error = new Error(err);
//   //   error.httpStatusCode = 500;
//   //   return next(error);
//   // });
// };

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
        // where: { s: 2 },
      },
    ],
  })
    .then((extra) => {
      // console.log(extra);
      // if (extra.adminId != req.admin.id) {
      //   return res.redirect("/");
      // }

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

        // await ExtraTranslation.update(
        //   { name: updatedEnName },
        //   { where: { id: extTranId[2], languageId: 3 } }
        // );
      }
      msg();

      res.redirect("/admin/vr-index");
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
