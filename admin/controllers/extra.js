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
        enName: enName,
      },
      errorMessage: errors.array()[0].msg,
      validationErrors: errors.array(),
    });
  }

  const extra = await req.admin.createExtra();

  async function extraTransaltion() {
    await ExtraTranslation.create({
      name: roName,
      languageId: 1,
      extraId: extra.id,
      adminId: req.admin.id,
    });
    await ExtraTranslation.create({
      name: huName,
      languageId: 2,
      adminId: req.admin.id,

      extraId: extra.id,
    });

    await ExtraTranslation.create({
      name: enName,
      languageId: 3,
      extraId: extra.id,
      adminId: req.admin.id,
    });
  }

  extraTransaltion()
    .then((result) => {
      console.log(extra.id);

      res.redirect("/admin/vr-index");
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getExtras = (req, res, next) => {
  Extra.findAll({ where: { adminId: req.admin.id } })
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

exports.getEditExtra = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }
  const extId = req.params.extraId;

  Extra.findAll({
    where: {
      id: extId,
    },
    include: [
      {
        model: ExtraTranslation,
      },
    ],
  })
    .then((extra) => {
      // const extra = extras[0];
      console.log("extra.adminId", extra[0].adminId);
      if (extra[0].adminId !== req.admin.id) {
        return res.redirect("/");
      }
      // console.log(extra.adminId);
      // console.log("req.admin", extra[0].adminId);
      if (extra[0].adminId !== req.admin.id) {
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
        extTranslations: extra[0].extraTranslations,
      });
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.postEditExtra = async (req, res, next) => {
  const updatedRoName = req.body.roName;
  const updatedHuName = req.body.huName;
  const updatedEnName = req.body.enName;
  const extTranId = req.body.extTranId;

  Extra.findAll({
    include: [
      {
        model: ExtraTranslation,
      },
    ],
  })
    .then((extra) => {
      // console.log(extra);
      // if (extra.adminId != req.admin.id) {
      //   return res.redirect("/");
      // }

      async function msg() {
        await ExtraTranslation.update(
          { name: updatedRoName },
          { where: { id: extTranId[0], languageId: 1 } }
        );

        await ExtraTranslation.update(
          { name: updatedHuName },
          { where: { id: extTranId[1], languageId: 2 } }
        );

        await ExtraTranslation.update(
          { name: updatedEnName },
          { where: { id: extTranId[2], languageId: 3 } }
        );
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
