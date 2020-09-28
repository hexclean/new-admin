const Extra = require("../../models/Extra");
const ExtraTranslation = require("../../models/ExtraTranslation");
const Allergen = require("../../models/Allergen");
const ProductVariantsExtras = require("../../models/ProductVariantsExtras");
const AllegenTranslation = require("../../models/AllergenTranslation");
const ExtraHasAllergen = require("../../models/ExtraHasAllergen");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

// Show create extra page
exports.getAddExtra = async (req, res, next) => {
  try {
    // Get all restaurant ellergen
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

    // Check if allergen length don't will be 0
    if (allergen.length === 0) {
      return res.redirect("/admin/vr-index");
    }

    // Add dates to edit-extra EJS file
    res.render("extra/edit-extra", {
      pageTitle: "Add Product",
      path: "/admin/add-product",
      editing: false,
      hasError: false,
      errorMessage: null,
      allergenArray: allergen,
      validationErrors: [],
    });
  } catch (err) {
    const error = new Error(err);
    error.httpStatusCode = 500;
    return next(error);
  }
};

exports.postAddExtra = async (req, res, next) => {
  const allergenId = req.body.allergenId;
  const roName = req.body.roName;
  const huName = req.body.huName;
  const enName = req.body.enName;
  const filteredStatus = req.body.status.filter(Boolean);

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

  async function createExtraTranslation() {
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

  async function addAllergenToExtra() {
    for (let i = 0; i <= allergen.length - 1; i++) {
      await ExtraHasAllergen.create({
        extraId: extra.id,
        allergenId: allergenId[i],
        active: filteredStatus[i] == "on" ? 1 : 0,
        adminId: req.admin.id,
      });
    }
  }

  async function add() {
    const extra = await ProductVariantsExtras.findAll({
      where: { adminId: req.admin.id },
    });

    if (Array.isArray(extra)) {
      for (let i = 0; i <= extra.length - 1; i++) {
        await ProductVariantsExtras.create({
          active: 0,
          adminId: req.admin.id,
          extraId: extra.id,
          extraId: extra[i].id,
          quantityMax: 0,
          quantityMin: 0,
          discountedPrice: 0,
          price: 0,
        });
      }
    } else {
      return;
    }
  }
  createExtraTranslation()
    .then((result) => {
      addAllergenToExtra();
      add();
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
  try {
    Extra.findAll({ where: { adminId: req.admin.id } }).then((extra) => {
      const currentLanguage = req.cookies.language;
      res.render("extra/extras", {
        ext: extra,
        currentLanguage: currentLanguage,
        pageTitle: "Admin Products",
        path: "/admin/products",
      });
    });
  } catch (err) {
    const error = new Error(err);
    error.httpStatusCode = 500;
    return next(error);
  }
};

// Show edit extra page
exports.getEditExtra = async (req, res, next) => {
  const editMode = req.query.edit;
  const extraId = req.params.extraId;
  const extraIdArray = [extraId];

  try {
    await Extra.findByPk(extraId).then((extra) => {
      if (!extra) {
        return res.redirect("/");
      }
    });

    if (!editMode) {
      return res.redirect("/");
    }

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

    const allergenActive = await Allergen.findAll({
      where: {
        adminId: req.admin.id,
      },
      include: [
        {
          model: AllegenTranslation,
        },
        {
          model: ExtraHasAllergen,
          where: { extraId: { [Op.in]: extraIdArray }, adminId: req.admin.id },
        },
      ],
    });

    const extra = await Extra.findAll({
      where: {
        id: extraId,
        adminId: req.admin.id,
      },
      include: [
        {
          model: ExtraTranslation,
        },
      ],
    });

    res.render("extra/edit-extra", {
      pageTitle: "Edit Product",
      path: "/admin/edit-product",
      editing: editMode,
      extra: extra,
      extraIdEditing: extraId,
      allergenArray: allergen,
      isActive: allergenActive,
      extraTranslation: extra[0].extraTranslations,
    });
  } catch (err) {
    const error = new Error(err);
    error.httpStatusCode = 500;
    return next(error);
  }
};

exports.postEditExtra = async (req, res, next) => {
  const allergenId = req.body.allergenId;
  const extraIdEditing = req.body.extraIdEditing;
  const updatedRoName = req.body.roName;
  const updatedHuName = req.body.huName;
  const updatedEnName = req.body.enName;
  const extTranId = req.body.extTranId;
  const filteredStatus = req.body.status.filter(Boolean);
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
