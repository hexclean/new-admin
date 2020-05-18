const Variants = require("../../../models/ProductVariant");
const VariantsTranslation = require("../../../models/ProductVariantTranslation");

exports.getVariants = (req, res, next) => {
  Variants.findAll({
    include: [
      {
        model: VariantsTranslation,
      },
    ],
  })
    .then((variants) => {
      res.render("super-admin/variants/variants", {
        variants: variants,
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

exports.getEditVariant = async (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }

  let variantNameRoView;
  let variantNameHuView;
  let variantNameEnView;

  const varId = req.params.variantId;

  const variantNameRo = await Variants.findAll({
    where: { id: varId },
    include: [
      {
        model: VariantsTranslation,
        where: { languageId: 1 },
      },
    ],
  });

  async function getVariantDescRo() {
    for (let i = 0; i < variantNameRo.length; i++) {
      variantNameRoView = variantNameRo[i].productVariantTranslations[0].name;
    }
  }

  const variantNameHu = await Variants.findAll({
    where: { id: varId },
    include: [
      {
        model: VariantsTranslation,
        where: { languageId: 2 },
      },
    ],
  });

  async function getVariantDescHu() {
    for (let i = 0; i < variantNameHu.length; i++) {
      variantNameHuView = variantNameHu[i].productVariantTranslations[0].name;
    }
  }

  const variantNameEn = await Variants.findAll({
    where: { id: varId },
    include: [
      {
        model: VariantsTranslation,
        where: { languageId: 3 },
      },
    ],
  });

  async function getVariantDescEn() {
    for (let i = 0; i < variantNameEn.length; i++) {
      variantNameEnView = variantNameEn[i].productVariantTranslations[0].name;
    }
  }

  Variants.findAll({
    where: { id: varId },
    include: [
      {
        model: VariantsTranslation,
      },
    ],
  })
    .then((variant) => {
      getVariantDescRo();
      getVariantDescHu();
      getVariantDescEn();
      res.render("super-admin/variants/edit-variant", {
        pageTitle: "Edit Product",
        path: "/admin/edit-product",
        editing: editMode,
        variantId: varId,
        variant: variant,

        variantNameRoView: variantNameRoView,
        variantNameHuView: variantNameHuView,
        variantNameEnView: variantNameEnView,
      });
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.postEditVariant = async (req, res, next) => {
  const varId = req.body.variantId;

  // Description
  const variantNameRoView = req.body.variantNameRoView;
  const variantNameHuView = req.body.variantNameHuView;
  const variantNameEnView = req.body.variantNameEnView;

  Variants.findAll({
    include: [
      {
        model: VariantsTranslation,
      },
    ],
  })
    .then((result) => {
      async function updateDailyMenuDescription() {
        await VariantsTranslation.update(
          {
            name: variantNameRoView,
          },
          { where: { productVariantId: varId, languageId: 1 } }
        );

        await VariantsTranslation.update(
          {
            name: variantNameHuView,
          },
          { where: { productVariantId: varId, languageId: 2 } }
        );

        await VariantsTranslation.update(
          {
            name: variantNameEnView,
          },
          { where: { productVariantId: varId, languageId: 3 } }
        );
      }
      updateDailyMenuDescription();
      res.redirect("/super-admin/variants");
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};
