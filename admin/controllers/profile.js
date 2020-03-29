const fileHelper = require("../../util/file");
const nexmo = require("nexmo");
const { validationResult } = require("express-validator/check");
const Admin = require("../../models/Admin");
const Product = require("../../models/Product");

exports.getEditProfile = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }
  const adminId = req.admin._id;
  Admin.findById(adminId)
    .then(admin => {
      if (!admin) {
        return res.redirect("/admin/products");
      }
      res.render("profile/edit-profile", {
        pageTitle: "Edit Product",
        path: "/admin/edit-product",
        editing: editMode,
        admin: admin,
        hasError: false,
        errorMessage: null,
        validationErrors: []
      });
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.postEditProfile = (req, res, next) => {
  const adminId = req.body.adminId;
  const updatedEmail = req.body.email;
  // const updatedCategory = req.body.category;
  // const updatedPrice = req.body.price;
  // const image = req.file;
  // const updatedDesc = req.body.description;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).render("admin/edit-profile", {
      pageTitle: "Edit Product",
      path: "/admin/edit-product",
      editing: true,
      hasError: true,
      admin: {
        email: updatedEmail,

        _id: adminId
      },
      errorMessage: errors.array()[0].msg,
      validationErrors: errors.array()
    });
  }

  Admin.findById(adminId)
    .then(admin => {
      admin.email = updatedEmail;

      return admin.save().then(result => {
        console.log("UPDATED PRODUCT!");
        res.redirect("/admin/products");
      });
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.postEditProfile = (req, res, next) => {
  const adminId = req.body.adminId;
  const updatedEmail = req.body.email;
  const updatedphoneNuber = req.body.phoneNuber;
  const updatedfullName = req.body.fullName;
  const updatedOpened = req.body.open;
  const updatedClosed = req.body.close;
  // Short Description
  const updatedRoShortCompanyDesc = req.body.roShortCompanyDesc;
  const updatedhuShortCompanyDesc = req.body.huShortCompanyDesc;
  const updatedEnShortCompanyDesc = req.body.enShortCompanyDesc;
  // Adress
  const updatedRoAdress = req.body.roAdress;
  const updatedHuAdress = req.body.huAdress;
  const updatedEnAdress = req.body.enAdress;
  // Location
  const updatedRoLocation = req.body.roLocation;
  const updatedHuLocation = req.body.huLocation;
  const updatedEnLocation = req.body.enLocation;

  // const image = req.file;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).render("profile/edit-profile", {
      pageTitle: "Edit Product",
      path: "/admin/edit-product",
      editing: true,
      hasError: true,
      admin: {
        open: updatedOpened,
        close: updatedClosed,
        email: updatedEmail,
        phoneNuber: updatedphoneNuber,
        fullName: updatedfullName,
        adress: {
          en: updatedEnAdress,
          ro: updatedRoAdress,
          hu: updatedHuAdress
        },
        shortCompanyDesc: {
          en: updatedEnShortCompanyDesc,
          ro: updatedRoShortCompanyDesc,
          hu: updatedhuShortCompanyDesc
        },
        location: {
          en: updatedEnLocation,
          ro: updatedRoLocation,
          hu: updatedHuLocation
        },
        _id: adminId
      },
      errorMessage: errors.array()[0].msg,
      validationErrors: errors.array()
    });
  }
  Admin.findById(adminId)
    .then(admin => {
      admin.email = updatedEmail;
      admin.open = updatedOpened;
      admin.close = updatedClosed;
      admin.fullName = updatedfullName;
      admin.phoneNuber = updatedphoneNuber;
      admin.adress = {
        en: updatedEnAdress,
        hu: updatedHuAdress,
        ro: updatedRoAdress
      };
      admin.shortCompanyDesc = {
        en: updatedEnShortCompanyDesc,
        ro: updatedRoShortCompanyDesc,
        hu: updatedhuShortCompanyDesc
      };
      admin.location = {
        en: updatedEnLocation,
        ro: updatedRoLocation,
        hu: updatedHuLocation
      };
      return admin.save().then(result => {
        console.log("UPDATED PRODUCT!");
        res.redirect("/admin/dashboard");
      });
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getDashboard = (req, res, next) => {
  const editMode = req.query.edit;

  const adminId = req.admin._id;
  Admin.findById(adminId)
    .then(admin => {
      if (!admin) {
        return res.redirect("/admin/products");
      }
      res.render("profile/dashboard", {
        pageTitle: "Edit admin",
        editing: editMode,
        path: "/admin/edit-admin",
        admin: admin
      });
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getDashboard2 = (req, res, next) => {
  const adminId = req.admin._id;
  Admin.findById(adminId)
    .then(admin => {
      if (!admin) {
        return res.redirect("/admin/products");
      }
      res.render("profile/edit-photo", {
        pageTitle: "Edit admin",
        editing: false,
        hasError: false,
        errorMessage: null,
        validationErrors: [],
        path: "/admin/edit-admin",
        admin: admin
      });
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};
exports.postAddPhoto = async (req, res, next) => {
 
  const image = req.file;
  if (!image) {
    return res.status(422).render("profile/edit-photo", {
      pageTitle: "Add Product",
      path: "/admin/add-product",
      editing: false,
      hasError: true,
      errorMessage: "Attached file is not an image.",
      validationErrors: []
    });
  }
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log(errors.array());
    return res.status(422).render("profile/edit-photo", {
      pageTitle: "Add Product",
      path: "/admin/add-product",
      editing: false,
      hasError: true,
      errorMessage: errors.array()[0].msg,
      validationErrors: errors.array()
    });
  }

  const imageUrl = image.path;

  await Admin.update({
  imageUrl: imageUrl
    
  })
    .then(result => {
      console.log("Created Product");
      res.redirect("/admin/dashboard");
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getEditPhoto = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }
  const adminId = req.params.adminId;
  Admin.findById(adminId)
    .then(admin => {
      if (!admin) {
        return res.redirect("/");
      }
      res.render("profile/edit-photo", {
        pageTitle: "Edit admin",
        path: "/admin/edit-admin",
        editing: editMode,
        admin: admin,
        hasError: false,
        errorMessage: null,
        validationErrors: []
      });
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.postEditPhoto = (req, res, next) => {
  const adminId = req.body.adminId;
  const image = req.file;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).render("admin/edit-photo", {
      pageTitle: "Edit Product",
      path: "/admin/edit-product",
      editing: true,
      hasError: true,
      admin: 
        {
          
          _id: adminId
        }
      ,
      errorMessage: errors.array()[0].msg,
      validationErrors: errors.array()
    });
  }

  Admin.findById(adminId)
    .then(admin => {
      if (image) {
        fileHelper.deleteFile(admin.imageUrl);
        admin.imageUrl = image.path;
      }
      return admin.save().then(result => {
        console.log("UPDATED PRODUCT!");
        res.redirect("/admin/dashboard");
      });
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};