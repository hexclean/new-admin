const fileHelper = require("../../util/file");
const nexmo = require("nexmo");
const { validationResult } = require("express-validator/check");

const Product = require("../../models/Product");

const Admin = require("../../models/Admin");
const Orders = require("../../models/Orders");

exports.getAddDailyMenu = (req, res, next) => {
  res.render("daily-menu/edit-daily-menu", {
    pageTitle: "Add Product",
    path: "/admin/edit-daily-menu",
    editing: false,
    hasError: false,
    errorMessage: null,
    validationErrors: []
  });
};

exports.postAddDailyMenu = async (req, res, next) => {
  const price = req.body.price;
  //
  const roDescription = req.body.roDescription;
  const huDescription = req.body.huDescription;
  const enDescription = req.body.enDescription;
  //
  const roCategory = req.body.roCategory;
  const huCategory = req.body.huCategory;
  const enCategory = req.body.enCategory;
  //
  const image = req.file;
  if (!image) {
    return res.status(422).render("daily-menu/edit-daily-menu", {
      pageTitle: "Add Product",
      path: "/daily-menu/add-daily-menu",
      editing: false,
      hasError: true,
      product: [
        {
          description: {
            en: enDescription,
            hu: huDescription,
            ro: roDescription
          },
          category: { en: enCategory, hu: huCategory, ro: roCategory }
        }
      ],
      errorMessage: "Attached file is not an image.",
      validationErrors: []
    });
  }
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log(errors.array());
    return res.status(422).render("daily-menu/edit-daily-menu", {
      pageTitle: "Add Product",
      path: "/daily-menu/edit-daily-menu",
      editing: false,
      hasError: true,
      product: {
        description: {
          en: enDescription,
          hu: huDescription,
          ro: roDescription
        },
        category: { en: enCategory, hu: huCategory, ro: roCategory }
      },
      errorMessage: errors.array()[0].msg,
      validationErrors: errors.array()
    });
  }

  const imageUrl = image.path;

  await Product.create({
    title: { en: "Daily Menu", hu: "Napi Menü", ro: "Meniul Zilei" },

    description: {
      en: enDescription,
      hu: huDescription,
      ro: roDescription
    },
    category: { en: enCategory, hu: huCategory, ro: roCategory },
    imageUrl: imageUrl,
    dailyMenu: "yes",
    price: price,
    adminId: req.admin,
    extraPrice: price * 1.1
  })
    .then(result => {
      console.log("Created Product");
      res.redirect("/admin/daily-menus");
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getEditDailyMenu = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then(product => {
      if (!product) {
        return res.redirect("/");
      }
      res.render("daily-menu/edit-daily-menu", {
        pageTitle: "Edit Product",
        path: "daily-menu/edit-daily-menu",
        editing: editMode,
        product: product,
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

exports.postEditDailyMenu = (req, res, next) => {
  const prodId = req.body.productId;
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
          price: updatedPrice,
          description: {
            en: updatedEnDesc,
            hu: updatedHuDesc,
            ro: updatedRoDesc
          },
          _id: prodId
        }
      ],
      errorMessage: errors.array()[0].msg,
      validationErrors: errors.array()
    });
  }

  Product.findById(prodId)
    .then(product => {
      if (product.adminId.toString() !== req.admin._id.toString()) {
        return res.redirect("/");
      }

      product.price = updatedPrice;

      product.description = {
        en: updatedEnDesc,
        hu: updatedHuDesc,
        ro: updatedRoDesc
      };
      if (image) {
        fileHelper.deleteFile(product.imageUrl);
        product.imageUrl = image.path;
      }
      return product.save().then(result => {
        console.log("UPDATED PRODUCT!");
        res.redirect("/admin/daily-menus");
      });
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getDailyMenu = (req, res, next) => {
  Product.find({ adminId: req.admin._id, dailyMenu: { $ne: "no" } })
    .then(products => {
      var currentLanguage = req.cookies.language;
      res.render("daily-menu/daily-menus-list", {
        prods: products,
        currentLanguage: currentLanguage,
        pageTitle: "Admin Products",
        path: "/admin/products"
      });
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};
