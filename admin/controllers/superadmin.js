const fileHelper = require("../../util/file");
const { validationResult } = require("express-validator/check");
const Admins = require("../../models/Admin");
const Users = require("../../models/User");

exports.getIndex = (req, res, next) => {
  res.render("super-admin/index", {
    pageTitle: "Admin Products",
    path: "/admin/products",
  });
};

exports.getPartners = (req, res, next) => {
  Admins.find()
    .then((partner) => {
      res.render("super-admin/partners", {
        ptr: partner,
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

exports.getUsers = (req, res, next) => {
  Users.find()
    .then((users) => {
      res.render("super-admin/users", {
        usr: users,
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

exports.getEditPartner = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }
  const partnerId = req.params.partnerId;
  Admins.findById(partnerId)
    .then((partner) => {
      if (!partner) {
        return res.redirect("/");
      }
      res.render("super-admin/edit-partner", {
        pageTitle: "Edit Product",
        path: "/admin/edit-product",
        editing: editMode,
        ptr: partner,
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

exports.postEditAdmin = (req, res, next) => {
  const partnerId = req.body.productId;
  // Title
  const updatedRoTitle = req.body.roTitle;
  const updatedHuTitle = req.body.huTitle;
  const updatedEnTitle = req.body.enTitle;
  // Category
  const updatedRoCategory = req.body.roCategory;
  const updatedHuCategory = req.body.huCategory;
  const updatedEnCategory = req.body.enCategory;
  // Description
  const updatedRoDesc = req.body.roDescription;
  const updatedHuDesc = req.body.huDescription;
  const updatedEnDesc = req.body.enDescription;
  //
  const updatedPrice = req.body.price;
  const image = req.file;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).render("admin/edit-product", {
      pageTitle: "Edit Product",
      path: "/admin/edit-product",
      editing: true,
      hasError: true,
      product: [
        {
          title: { en: updatedEnTitle, hu: updatedHuTitle, ro: updatedRoTitle },
          price: updatedPrice,
          description: {
            en: updatedEnDesc,
            hu: updatedHuDesc,
            ro: updatedRoDesc,
          },
          category: {
            en: updatedEnCategory,
            hu: updatedHuCategory,
            ro: updatedRoCategory,
          },
          _id: partnerId,
        },
      ],
      errorMessage: errors.array()[0].msg,
      validationErrors: errors.array(),
    });
  }

  Product.findById(partnerId)
    .then((product) => {
      if (product.partnerId.toString() !== req.admin._id.toString()) {
        return res.redirect("/");
      }
      product.title = {
        en: updatedEnTitle,
        hu: updatedHuTitle,
        ro: updatedRoTitle,
      };
      product.price = updatedPrice;
      product.category = {
        en: updatedEnCategory,
        hu: updatedHuCategory,
        ro: updatedRoCategory,
      };
      product.description = {
        en: updatedEnDesc,
        hu: updatedHuDesc,
        ro: updatedRoDesc,
      };

      return product.save().then((result) => {
        res.redirect("/admin/products");
      });
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};
