const fileHelper = require("../../util/file");
const { validationResult } = require("express-validator/check");
const Variant = require("../../models/ProductVariant");
const VariantTranslation = require("../../models/ProductVariantTranslation");

exports.getIndex = async (req, res, next) => {
  res
    .render("variant/index", {
      pageTitle: "Admin Products",
      path: "/admin/products",
    })

    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getAddVariant = (req, res, next) => {
  res.render("variant/edit-variant", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
    hasError: false,
    errorMessage: null,
    validationErrors: [],
  });
};

exports.postAddVariant = async (req, res, next) => {
  const roName = req.body.roName;
  const huName = req.body.huName;
  const enName = req.body.enName;
  const price = req.body.price;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log(errors.array());
    return res.status(422).render("admin/edit-product", {
      pageTitle: "Add Product",
      path: "/admin/add-product",
      editing: false,
      hasError: true,
      variant: {
        roName: roName,
        huName: huName,
        enName: enName,
        price: price,
      },
      errorMessage: errors.array()[0].msg,
      validationErrors: errors.array(),
    });
  }

  const variant = await req.admin.createProductVariant({
    price: price,
  });

  async function productVariantTransaltion() {
    await VariantTranslation.create({
      name: roName,
      languageId: 1,
      productVariantId: variant.id,
    });
    await VariantTranslation.create({
      name: huName,
      languageId: 2,
      productVariantId: variant.id,
    });

    await VariantTranslation.create({
      name: enName,
      languageId: 3,
      productVariantId: variant.id,
    });
  }

  productVariantTransaltion()
    .then((result) => {
      res.redirect("/admin/add-product");
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};
