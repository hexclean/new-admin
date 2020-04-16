const fileHelper = require("../../util/file");
const { validationResult } = require("express-validator/check");
const VariantTranslation = require("../../models/ProductVariantTranslation");
const productVariant = require("../../models/ProductVariant");
const ProductCategoryTranslation = require("../../models/ProductCategoryTranslation");
const ProductVariantsExtras = require("../../models/ProductVariantsExtras");

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

exports.getAddVariant = async (req, res, next) => {
  const ext = 0;
  res.render("variant/edit-variant", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
    hasError: false,
    ext: ext,
    errorMessage: null,

    validationErrors: [],
  });
};

exports.postAddVariant = async (req, res, next) => {
  const roName = req.body.roName;
  const huName = req.body.huName;
  const enName = req.body.enName;
  const sku = req.body.sku;
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
        sku: sku,
      },
      errorMessage: errors.array()[0].msg,
      validationErrors: errors.array(),
    });
  }

  const variant = await req.admin.createProductVariant();

  async function productVariantTransaltion() {
    await VariantTranslation.create({
      name: roName,
      languageId: 1,
      productVariantId: variant.id,
      sku: sku,
    });
    await VariantTranslation.create({
      name: huName,
      languageId: 2,
      sku: sku,
      productVariantId: variant.id,
    });

    await VariantTranslation.create({
      name: enName,
      languageId: 3,
      sku: sku,
      productVariantId: variant.id,
    });
  }

  productVariantTransaltion()
    .then((result) => {
      res.redirect("/admin/edit-variant/" + variant.id + "/?edit=true");
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.postEditVariant = async (req, res, next) => {
  const vrId = req.body.variantId;
  const extId = req.body.extraId;
  const updatedSku = req.body.sku;
  const updatedRoName = req.body.roName;
  const updatedHuName = req.body.huName;
  const updatedEnName = req.body.enName;

  ////itt is nezni req.body.price[i]
  const updatedExtraPrice = req.body.price;
  const updatedExtraDiscountedPrice = req.body.discountedPrice;
  const updatedExtraQuantityMin = req.body.quantityMin;
  const updatedExtraQuantityMax = req.body.quantityMax;
  const updatedExtraMandatory = req.body.mandatory;
  const ext = await req.admin.getExtras();

  async function updateProductVariant() {
    await VariantTranslation.update(
      { name: updatedRoName, sku: updatedSku },

      { where: { productVariantId: vrId, languageId: 1 } }
    );
    await VariantTranslation.update(
      { name: updatedHuName, sku: updatedSku },

      { where: { productVariantId: vrId, languageId: 2 } }
    );
    await VariantTranslation.update(
      { name: updatedEnName, sku: updatedSku },

      { where: { productVariantId: vrId, languageId: 3 } }
    );
    console.log(req.body);
    // for
    if (typeof req.body["status"] == "undefined") {
      return;
    } else {
      await ProductVariantsExtras.create({
        price: updatedExtraPrice,
        discountedPrice: updatedExtraDiscountedPrice,
        quantityMin: updatedExtraQuantityMin,
        quantityMax: updatedExtraQuantityMax,
        mandatory: updatedExtraMandatory,
        productVariantId: vrId,
        extraId: extId,
        active: typeof req.body["status"] !== "undefined" ? 1 : 0,
      });
    }
  }

  updateProductVariant()
    .then((result) => {
      res.redirect("/");
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
  const vrId = req.params.variantId;
  const extraId = req.params.extraId;
  const variant = await VariantTranslation.findAll({
    where: { productVariantId: vrId },
  });

  if (!variant) {
    return res.redirect("/");
  }
  console.log(req.params.extraId);
  const ext = await req.admin.getExtras();
  res.render("variant/edit-variant", {
    pageTitle: "Edit Product",
    path: "/admin/edit-product",
    editing: editMode,
    variant: variant,
    extraId: extraId,
    ext: ext,
    variantId: vrId,
    hasError: false,
    errorMessage: null,
    validationErrors: [],
  });
};

exports.getAddProductCategory = (req, res, next) => {
  res.render("category/edit-category", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
    hasError: false,
    errorMessage: null,
    validationErrors: [],
  });
};
exports.postAddProductCategory = async (req, res, next) => {
  const roName = req.body.roName;
  const huName = req.body.huName;
  const enName = req.body.enName;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log(errors.array());
    return res.status(422).render("category/edit-category", {
      pageTitle: "Add Product",
      path: "/admin/add-product",
      editing: false,
      hasError: true,
      category: {
        roName: roName,
        huName: huName,
        enName: enName,
      },
      errorMessage: errors.array()[0].msg,
      validationErrors: errors.array(),
    });
  }

  const category = await req.admin.createProductCategory();

  async function productCategoryTransaltion() {
    await ProductCategoryTranslation.create({
      name: roName,
      languageId: 1,
      productCategoryId: category.id,
    });
    await ProductCategoryTranslation.create({
      name: huName,
      languageId: 2,
      productCategoryId: category.id,
    });

    await ProductCategoryTranslation.create({
      name: enName,
      languageId: 3,
      productCategoryId: category.id,
    });
  }

  productCategoryTransaltion()
    .then((result) => {
      res.redirect("/admin/g/");
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};
