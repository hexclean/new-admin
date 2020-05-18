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
      variantNameRoView = variantNameRo[i].dailyMenuTranslations[0].description;
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
      variantNameHuView = variantNameHu[i].dailyMenuTranslations[0].description;
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
      variantNameEnView = variantNameEn[i].dailyMenuTranslations[0].description;
    }
  }

  DailyMenus.findAll({
    where: { id: varId },
    include: [
      {
        model: VariantsTranslation,
      },
    ],
  })
    .then((dailyMenu) => {
      getVariantDescRo();
      getVariantDescHu();
      getVariantDescEn();
      res.render("super-admin/variants/edit-variant", {
        pageTitle: "Edit Product",
        path: "/admin/edit-product",
        editing: editMode,
        dailyMenuId: dailyM,
        dailyMenu: dailyMenu,

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

exports.postEditDailyMenu = async (req, res, next) => {
  const dailyM = req.body.dailyMenuId;

  // Description
  const dailyMenuDescriptionRoView = req.body.dailyMenuDescriptionRoView;
  const productTitleHuView = req.body.productTitleHuView;
  const productTitleEnView = req.body.productTitleEnView;

  DailyMenus.findAll({
    include: [
      {
        model: DailyMenusTranslation,
      },
    ],
  })
    .then((result) => {
      async function updateDailyMenuDescription() {
        await DailyMenusTranslation.update(
          {
            description: dailyMenuDescriptionRoView,
          },
          { where: { dailyMenuId: dailyM, languageId: 1 } }
        );

        await DailyMenusTranslation.update(
          {
            description: productTitleHuView,
          },
          { where: { dailyMenuId: dailyM, languageId: 2 } }
        );

        await DailyMenusTranslation.update(
          {
            description: productTitleEnView,
          },
          { where: { dailyMenuId: dailyM, languageId: 3 } }
        );
      }
      updateDailyMenuDescription();
      res.redirect("/super-admin/daily-menus");
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};
