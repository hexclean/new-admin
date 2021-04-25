const Extra = require("../../models/Extra");
const ExtraTranslation = require("../../models/ExtraTranslation");
const Allergen = require("../../models/Allergen");
const ProductVariantsExtras = require("../../models/ProductVariantsExtras");
const ProductVariants = require("../../models/Variant");
const AllergenTranslation = require("../../models/AllergenTranslation");
const ExtraHasAllergen = require("../../models/ExtraHasAllergen");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const AdminLogs = require("../../models/AdminLogs");
const Category = require("../../models/Category");
const { body } = require("express-validator");
const { where } = require("sequelize");

// Show create extra page
exports.getAddExtra = async (req, res, next) => {
  await AdminLogs.create({
    restaurant_id: req.admin.id,
    operation_type: "GET",
    description: "Opened the extra creation page",
    route: "getAddExtra",
  });
  let languageCode;

  if (req.cookies.language == "ro") {
    languageCode = 1;
  } else if (req.cookies.language == "hu") {
    languageCode = 2;
  } else {
    languageCode = 3;
  }
  try {
    // Get all restaurant ellergen
    const allergen = await Allergen.findAll({
      where: {
        restaurantId: req.admin.id,
      },
      include: [
        {
          model: AllergenTranslation,
          where: { languageId: languageCode },
        },
      ],
    });

    // Check if allergen length don't will be 0
    if (allergen.length < 3) {
      return res.redirect("/admin/extra-index");
    }

    // Add dates to edit-extra EJS file
    res.render("extra/edit-extra", {
      pageTitle: "Add Product",
      path: "/admin/add-product",
      editing: false,
      allergenArray: allergen,
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
  const price = req.body.price;
  console.log(req.body);
  // let extraType;

  // if (req.body.extraOpt == 1) {
  //   extraType = 1;
  // } else {
  //   extraType = 2;
  // }
  if (
    roName.length == 0 ||
    huName.length == 0 ||
    enName.length == 0 ||
    allergenId.length == 0 ||
    filteredStatus.length == 0
  ) {
    return res.redirect("/admin/extra-index");
  }

  const allergen = await Allergen.findAll({
    where: {
      restaurantId: req.admin.id,
    },
    include: [
      {
        model: AllergenTranslation,
      },
    ],
  });

  try {
    const extra = await Extra.create({
      // extraType: extraType,
      price: price,
      restaurantId: req.admin.id,
    });

    async function createExtraTranslation() {
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

      await AdminLogs.create({
        restaurant_id: req.admin.id,
        operation_type: "POST",
        description: `Extra created with ${extra.id} id.
        Box Translations: ro: ${roName}, hu: ${huName}, en: ${enName}
        `,
        route: "postAddExtra",
      });
    }

    async function addAllergenToExtra() {
      for (let i = 0; i <= allergen.length - 1; i++) {
        await ExtraHasAllergen.create({
          extraId: extra.id,
          allergenId: allergenId[i],
          active: filteredStatus[i] == "on" ? 1 : 0,
          restaurantId: req.admin.id,
        });
        await AdminLogs.create({
          restaurant_id: req.admin.id,
          operation_type: "POST",
          description: `Allergen added to extraId: ${
            extra.id
          } with allergenId: ${allergenId} active equal to 0.
          Allergen added to extraId: ${extra.id} with allergenId: ${
            filteredStatus[i] == "on" ? 1 : 0
          } active equal to 1 
          `,
          route: "addAllergenToExtra",
        });
      }
    }

    async function add() {
      const variants = await ProductVariants.findAll({
        where: { restaurantId: req.admin.id },
      });

      for (let i = 0; i < variants.length; i++) {
        let variantId = [];
        let extraId = [];

        variantId = variants[i].id;
        extraId = extra.id;

        await ProductVariantsExtras.create({
          active: 0,
          restaurantId: req.admin.id,
          extraId: extraId,
          discountedPrice: 0,
          price: 0,
          // extraType: extraType,
          variantId: variantId,
          requiredExtra: 0,
        });
        await AdminLogs.create({
          restaurant_id: req.admin.id,
          operation_type: "POST",
          description: `ProductVariantsExtras created with extraId: ${extraId} and 
          variantId: ${variantId}`,
          route: "add",
        });
      }
    }

    await createExtraTranslation();
    await addAllergenToExtra();
    await add();

    res.redirect("/admin/extra-index"),
      {
        allergenArray: allergen,
      };
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
  await Extra.findByPk(extraId).then((extra) => {
    if (!extra || !editMode) {
      return res.redirect("/");
    }
  });
  let languageCode;
  let extraTypeVal;
  if (req.cookies.language == "ro") {
    languageCode = 1;
  } else if (req.cookies.language == "hu") {
    languageCode = 2;
  } else {
    languageCode = 3;
  }

  try {
    const allergen = await Allergen.findAll({
      where: {
        restaurantId: req.admin.id,
      },
      include: [
        {
          model: AllergenTranslation,
          where: { languageId: languageCode },
        },
        { model: ExtraHasAllergen },
      ],
    });

    const allergenActive = await Allergen.findAll({
      where: {
        restaurantId: req.admin.id,
      },
      include: [
        {
          model: AllergenTranslation,
          where: { languageId: languageCode },
        },
        {
          model: ExtraHasAllergen,
          where: {
            extraId: { [Op.in]: extraIdArray },
            restaurantId: req.admin.id,
          },
        },
      ],
    });

    const extra = await Extra.findAll({
      where: {
        id: extraId,
        restaurantId: req.admin.id,
      },
      include: [
        {
          model: ExtraTranslation,
        },
      ],
    });
    // extraTypeVal = extra[0].extraType;
    // console.log(
    //   "extraTypeValextraTypeValextraTypeValextraTypeVal",
    //   extraTypeVal
    // );
    res.render("extra/edit-extra", {
      pageTitle: "Edit Product",
      path: "/admin/edit-product",
      editing: editMode,
      extra: extra,
      extraIdEditing: extraId,
      allergenArray: allergen,
      isActive: allergenActive,
      extraTranslation: extra[0].ExtraTranslations,
      extraTypeVal: extraTypeVal,
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
  const price = req.body.price;
  // let extraType;
  // console.log(req.body);
  // if (req.body.extraOpt == 1) {
  //   extraType = 1;
  // } else {
  //   extraType = 2;
  // }

  if (
    allergenId.length == 0 ||
    extraIdEditing.length == 0 ||
    updatedRoName.length == 0 ||
    updatedHuName.length == 0 ||
    updatedEnName.length == 0 ||
    extTranId.length == 0 ||
    filteredStatus.length == 0
  ) {
    return res.redirect("/admin/extra-index");
  }

  const extrasHasAllergen = await ExtraHasAllergen.findAll({
    where: {
      extraId: {
        [Op.in]: extraArray,
      },
    },
  });

  try {
    await Extra.findAll({
      include: [
        {
          model: ExtraTranslation,
        },
      ],
    }).then(async (extra) => {
      async function updateExtraTranslation() {
        await Extra.update({ price: price }, { where: { id: extraIdEditing } });
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
      async function updateExtraHasAllergen() {
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
                  restaurantId: req.admin.id,
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

      updateExtraTranslation();
      updateExtraHasAllergen();

      res.redirect("/admin/extra-index");
    });
  } catch (err) {
    const error = new Error(err);
    error.httpStatusCode = 500;
    return next(error);
  }
};
