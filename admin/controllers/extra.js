const Extra = require("../../models/Extra");
const ExtraTranslation = require("../../models/ExtraTranslation");
const ProductVariantsExtras = require("../../models/ProductVariantsExtras");
const ProductVariants = require("../../models/Variant");

// GET
// Extra létrehozás oldal betöltése
exports.getAddExtra = async (req, res, next) => {
  let languageCode;

  if (req.cookies.language == "ro") {
    languageCode = 1;
  } else if (req.cookies.language == "hu") {
    languageCode = 2;
  } else {
    languageCode = 3;
  }
  try {
    res.render("extra/edit-extra", {
      pageTitle: "Add Product",
      path: "/admin/add-product",
      editing: false,
    });
  } catch (err) {
    const error = new Error(err);
    error.httpStatusCode = 500;
    return next(error);
  }
};

// POST
// Extra létrehozása
exports.postAddExtra = async (req, res, next) => {
  const roName = req.body.roName;
  const huName = req.body.huName;
  const enName = req.body.enName;
  const price = req.body.price;

  if (
    roName.length == 0 ||
    huName.length == 0 ||
    enName.length == 0 ||
    price.length == 0
  ) {
    return res.redirect("/admin/extra-index");
  }

  try {
    const extra = await Extra.create({
      // extraType: extraType,
      price: price,
      restaurantId: req.admin.id,
    });

    async function createExtra() {
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

    async function addExtraToVariant() {
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
      }
    }

    await createExtra();
    await addExtraToVariant();

    res.redirect("/admin/extra-index");
  } catch (err) {
    const error = new Error(err);
    error.httpStatusCode = 500;
    return next(error);
  }
};

// GET
// Extra szerkesztés oldal betöltése
exports.getEditExtra = async (req, res, next) => {
  const editMode = req.query.edit;
  const extraId = req.params.extraId;
  await Extra.findByPk(extraId).then((extra) => {
    if (!extra || !editMode) {
      return res.redirect("/");
    }
  });

  try {
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

    res.render("extra/edit-extra", {
      pageTitle: "Edit Product",
      path: "/admin/edit-product",
      editing: editMode,
      extra: extra,
      extraId: extraId,
      extraTranslation: extra[0].ExtraTranslations,
    });
  } catch (err) {
    const error = new Error(err);
    error.httpStatusCode = 500;
    return next(error);
  }
};

// POST
// Extra frissítése
exports.postEditExtra = async (req, res, next) => {
  const roName = req.body.roName;
  const huName = req.body.huName;
  const enName = req.body.enName;
  const price = req.body.price;
  const extraId = req.body.extraId;
  if (
    roName.length == 0 ||
    huName.length == 0 ||
    enName.length == 0 ||
    price.length == 0
  ) {
    return res.redirect("/admin/extra-index");
  }
  try {
    async function updateExtra() {
      await Extra.update({ price: price }, { where: { id: extraId } });

      await ExtraTranslation.update(
        { name: roName },
        { where: { extraId: extraId, languageId: 1 } }
      );

      await ExtraTranslation.update(
        { name: huName },
        { where: { extraId: extraId, languageId: 2 } }
      );

      await ExtraTranslation.update(
        { name: enName },
        { where: { extraId: extraId, languageId: 3 } }
      );
    }

    await updateExtra();

    res.redirect("/admin/extra-index");
  } catch (err) {
    const error = new Error(err);
    error.httpStatusCode = 500;
    return next(error);
  }
};
