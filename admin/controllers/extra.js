const Extra = require("../../models/Extra");
const ExtraTranslation = require("../../models/ExtraTranslation");
const Allergen = require("../../models/Allergen");
const AllegenTranslation = require("../../models/AllergenTranslation");
const ExtraHasAllergen = require("../../models/ExtraHasAllergen");
var Sequelize = require("sequelize");

// Betölti az extra létrehozás oldalt
exports.getAddExtra = async (req, res, next) => {
  const checkAllergenLength = await Allergen.findAll({
    where: {
      adminId: req.admin.id,
    },
  });
  if (checkAllergenLength.length === 0) {
    return res.redirect("/admin/vr-index");
  }

  const allergen = await Allergen.findAll({
    where: {
      adminId: req.admin.id,
    },
    include: [
      {
        model: AllegenTranslation,
      },
    ],
  });
  res.render("extra/edit-extra", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
    hasError: false,
    errorMessage: null,
    allergenArray: allergen,
    validationErrors: [],
  });
};

// Létrehoz egy extrát
exports.postAddExtra = async (req, res, next) => {
  const allergenId = req.body.allergenId;
  const roName = req.body.roName;
  const huName = req.body.huName;
  const enName = req.body.enName;
  var filteredStatus = req.body.status.filter(Boolean);
  const allergen = await Allergen.findAll({
    where: {
      adminId: req.admin.id,
    },
    include: [
      {
        model: AllegenTranslation,
      },
    ],
  });

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

  if (Array.isArray(allergen)) {
    for (let i = 0; i <= allergen.length - 1; i++) {
      await ExtraHasAllergen.create({
        extraId: extra.id,
        allergenId: allergenId[i],
        active: filteredStatus[i] == "on" ? 1 : 0,
        adminId: req.admin.id,
      });
    }
  }

  extraTransaltion()
    .then((result) => {
      res.redirect("/admin/vr-index"),
        {
          allergenArray: allergen,
        };
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

exports.getEditExtra = async (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }
  const Op = Sequelize.Op;
  const extId = req.params.extraId;
  const test = [extId];
  const allergen = await Allergen.findAll({
    where: {
      adminId: req.admin.id,
    },
    include: [
      {
        model: AllegenTranslation,
      },
      { model: ExtraHasAllergen },
    ],
  });

  const allergenTest = await Allergen.findAll({
    where: {
      adminId: req.admin.id,
    },
    include: [
      {
        model: AllegenTranslation,
      },
      {
        model: ExtraHasAllergen,
        where: { extraId: { [Op.in]: test }, adminId: req.admin.id },
      },
    ],
  });

  Extra.findAll({
    where: {
      id: extId,
      adminId: req.admin.id,
    },
    include: [
      {
        model: ExtraTranslation,
      },
    ],
  })
    .then((extra) => {
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
        extraIdEditing: extId,
        validationErrors: [],
        allergenArray: allergen,
        isActive: allergenTest,
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
  const allergenId = req.body.allergenId;
  const extraIdEditing = req.body.extraIdEditing;
  const updatedRoName = req.body.roName;
  const updatedHuName = req.body.huName;
  const updatedEnName = req.body.enName;
  const extTranId = req.body.extTranId;
  const filteredStatus = req.body.status.filter(Boolean);
  const Op = Sequelize.Op;
  const extraArray = [extraIdEditing];
  //
  const extrasHasAllergen = await ExtraHasAllergen.findAll({
    where: {
      extraId: {
        [Op.in]: extraArray,
      },
    },
  });
  Extra.findAll({
    include: [
      {
        model: ExtraTranslation,
      },
    ],
  })
    .then((extra) => {
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

        if (Array.isArray(extrasHasAllergen)) {
          const Op = Sequelize.Op;
          for (let i = 0; i <= extrasHasAllergen.length - 1; i++) {
            let allergenIds = [allergenId[i]];
            let extraId = [extraIdEditing];

            await ExtraHasAllergen.update(
              {
                active: filteredStatus[i] == "on" ? 1 : 0,
              },
              {
                where: {
                  adminId: req.admin.id,
                  allergenId: {
                    [Op.in]: allergenIds,
                  },
                  extraId: {
                    [Op.in]: extraId,
                  },
                },
              }
            );
          }
        }
      }
      msg();

      res.redirect("/admin/vr-index"),
        {
          allergenArray: 1,
        };
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};
