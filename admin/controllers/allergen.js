const Allergen = require("../../models/Allergen");
const AllergensTranslation = require("../../models/AllergenTranslation");
const DailyMenu = require("../../models/DailyMenu");
const DailyMenuFinal = require("../../models/DailyMenuFinal");

exports.getAddAllergen = (req, res, next) => {
  res.render("allergen/edit-allergen", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
    hasError: false,
    errorMessage: null,
    validationErrors: [],
  });
};

exports.postAddAllergen = async (req, res, next) => {
  const roName = req.body.roName;
  const huName = req.body.huName;
  const enName = req.body.enName;

  let dailyMenuId = await DailyMenu.findAll({
    where: { adminId: req.admin.id },
  });
  console.log(dailyMenuId);

  const allergen = await Allergen.create({
    adminId: req.admin.id,
  });

  async function extraTransaltion() {
    await AllergensTranslation.create({
      name: roName,
      languageId: 1,
      allergenId: allergen.id,
      adminId: req.admin.id,
    });
    await AllergensTranslation.create({
      name: huName,
      languageId: 2,
      adminId: req.admin.id,

      allergenId: allergen.id,
    });

    await AllergensTranslation.create({
      name: enName,
      languageId: 3,
      allergenId: allergen.id,
      adminId: req.admin.id,
    });

    for (let i = 0; i <= dailyMenuId.length - 1; i++) {
      console.log("variantId[i].id", dailyMenuId[i].id);
      await DailyMenuFinal.create({
        active: 0,
        allergenId: allergen.id,
        imageUrl: dailyMenuId[i].imageUrl,
        adminId: req.admin.id,
      });
    }
  }

  extraTransaltion()
    .then((result) => {
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

exports.getEditAllergen = (req, res, next) => {
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
      console.log("extra.adminId", extra[0].adminId);
      if (extra[0].adminId !== req.admin.id) {
        return res.redirect("/");
      }

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

exports.postEditAllergen = async (req, res, next) => {
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
