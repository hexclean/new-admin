const fileHelper = require("../../util/file");
const { validationResult } = require("express-validator/check");
const Extra = require("../../models/Extra");
const ExtraTranslation = require("../../models/ExtraTranslation");

exports.getAddExtra = (req, res, next) => {
  res.render("extra/edit-extra", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
    hasError: false,
    errorMessage: null,
    validationErrors: [],
  });
};

exports.postAddExtra = async (req, res, next) => {
  const roName = req.body.roName;
  const huName = req.body.huName;
  const enName = req.body.enName;
  const amount = req.body.amount;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log(errors.array());
    return res.status(422).render("extra/edit-extra", {
      pageTitle: "Add Product",
      path: "/admin/add-product",
      editing: false,
      hasError: true,
      extra: {
        roName: roName,
        huName: huName,
        huName: huName,
      },
      errorMessage: errors.array()[0].msg,
      validationErrors: errors.array(),
    });
  }

  const extra = await req.admin.createExtra({
    amount: amount,
  });

  async function extraTransaltion() {
    await ExtraTranslation.create({
      name: roName,
      languageId: 1,
      extraId: extra.id,
    });
    await ExtraTranslation.create({
      name: huName,
      languageId: 2,

      extraId: extra.id,
    });

    await ExtraTranslation.create({
      name: enName,
      languageId: 3,
      extraId: extra.id,
    });
  }

  extraTransaltion()
    .then((result) => {
      console.log(extra.id);

      res.redirect("/admin/add-extra");
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getExtras = (req, res, next) => {
  Extra.findAll()
    .then((extra) => {
      var currentLanguage = req.cookies.language;
      res.render("extra/extras", {
        ext: extra,
        currentLanguage: currentLanguage,
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

// exports.getEditExtra = async (req, res, next) => {
//   const editMode = req.query.edit;
//   if (!editMode) {
//     return res.redirect("/");
//   }

//   const extra = await Extra.findAll({ adminId: req.admin.id });

//   if (!extra) {
//     return res.redirect("/");
//   }

//   res.render("extra/edit-extra", {
//     pageTitle: "Edit extra",
//     path: "/admin/edit-extra",
//     editing: editMode,
//     extra: extra,
//     hasError: false,
//     errorMessage: null,
//     validationErrors: [],
//     extra: extra,
//   });
// };

exports.getEditExtra = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }
  const extId = req.params.extraId;
  req.admin.getExtras({ where: { id: extId } });
  Extra.findByPk(extId)
    .then((extra) => {
      if (!extra) {
        return res.redirect("/");
      }
      res.render("extra/edit-extra", {
        pageTitle: "Edit Product",
        path: "/admin/edit-product",
        editing: editMode,
        extra: extra,
        hasError: false,
        errorMessage: null,
        validationErrors: [],
      });
    })
    .catch((err) => console.log(err));
};

exports.postEditExtra = (req, res, next) => {
  const extId = req.body.extraId;
  // const updatedTitle = req.body.title;
  // const updatedPrice = req.body.price;
  // const updatedImageUrl = req.body.imageUrl;
  const updatedAmount = req.body.amount;
  Extra.findByPk(extId)
    .then((extra) => {
      extra.amount = updatedAmount;
      return extra.save();
    })
    .then((result) => {
      console.log("UPDATED PRODUCT!");
      res.redirect("/admin/products");
    })
    .catch((err) => console.log(err));
};

exports.getProducts = (req, res, next) => {
  req.user
    .getProducts()
    .then((products) => {
      res.render("admin/products", {
        prods: products,
        pageTitle: "Admin Products",
        path: "/admin/products",
      });
    })
    .catch((err) => console.log(err));
};
