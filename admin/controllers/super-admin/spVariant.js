const Variants = require("../../../models/Variant");

exports.getVariants = (req, res, next) => {
  Variants.findAll({})
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
        where: { languageId: 1 },
      },
    ],
  });

  const variantNameHu = await Variants.findAll({
    where: { id: varId },
    include: [
      {
        where: { languageId: 2 },
      },
    ],
  });

  const variantNameEn = await Variants.findAll({
    where: { id: varId },
    include: [
      {
        where: { languageId: 3 },
      },
    ],
  });

  Variants.findAll({
    where: { id: varId },
  })
    .then((variant) => {
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
      res.redirect("/super-admin/variants");
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};
