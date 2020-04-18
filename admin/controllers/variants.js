const { validationResult } = require("express-validator/check");
const ProductVariantTranslation = require("../../models/ProductVariantTranslation");
const ProductCategoryTranslation = require("../../models/ProductCategoryTranslation");
const ProductVariantsExtras = require("../../models/ProductVariantsExtras");
const ProductVariants = require("../../models/ProductVariant");
const ITEMS_PER_PAGE = 15;

exports.getIndex = async (req, res, next) => {
  const page = +req.query.page || 1;
  let totalItems;
  await req.admin
    .getProductVariants()

    .then((numVariants) => {
      totalItems = numVariants;
      return req.admin.getProductVariants({
        offset: (page - 1) * ITEMS_PER_PAGE,
        limit: ITEMS_PER_PAGE,
      });
    })
    .then((vr) => {
      console.log("totalItems.length", totalItems.length);
      console.log("ITEMS_PER_PAGE", ITEMS_PER_PAGE);
      console.log(
        "totalItems / ITEMS_PER_PAGE:::",
        Math.ceil(totalItems.length / ITEMS_PER_PAGE)
      );
      res.render("variant/index", {
        pageTitle: "Admin Products",
        path: "/admin/products",
        currentPage: page,
        hasNextPage: ITEMS_PER_PAGE * page < totalItems.length,
        hasPreviousPage: page > 1,
        nextPage: page + 1,
        previousPage: page - 1,
        lastPage: Math.ceil(totalItems.length / ITEMS_PER_PAGE),
        vr: vr,
      });
      console.log(
        "lastPage.length",
        Math.ceil(totalItems.length / ITEMS_PER_PAGE)
      );
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getAddVariant = async (req, res, next) => {
  const ext = await req.admin.getExtras();
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
  const extId = req.body.extraId;
  const roName = req.body.roName;
  const huName = req.body.huName;
  const enName = req.body.enName;
  const sku = req.body.sku;
  //
  const vrId = req.body.variantId;
  const updatedExtraPrice = req.body.price;
  const updatedExtraDiscountedPrice = req.body.discountedPrice;
  const updatedExtraQuantityMin = req.body.quantityMin;
  const updatedExtraQuantityMax = req.body.quantityMax;
  const updatedExtraMandatory = req.body.mandatory;
  const status = req.body.status;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log(errors.array());
    return res.status(422).render("variant/edit-variant", {
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
  const ext = await req.admin.getExtras();

  async function productVariantTransaltion() {
    await ProductVariantTranslation.create({
      name: roName,
      languageId: 1,
      productVariantId: variant.id,
      sku: sku,
    });
    await ProductVariantTranslation.create({
      name: huName,
      languageId: 2,
      sku: sku,
      productVariantId: variant.id,
    });

    await ProductVariantTranslation.create({
      name: enName,
      languageId: 3,
      sku: sku,
      productVariantId: variant.id,
    });
  }
  async function addExtraToVariant() {
    if (Array.isArray(ext)) {
      for (let i = 0; ext.length - 1; i++) {
        if (status[i] == "on") {
          console.log("1");
          await ProductVariantsExtras.create({
            price: updatedExtraPrice[i],
            discountedPrice: updatedExtraDiscountedPrice[i],
            quantityMin: updatedExtraQuantityMin[i],
            quantityMax: updatedExtraQuantityMax[i],
            mandatory: updatedExtraMandatory[i],
            productVariantId: variant.id,
            extraId: extId[i],
            active: typeof status[i] == "on" ? 0 : 1,
          });
        } else {
          if (status[i] == "undefined") {
            console.log("9");
            next();
          }
        }
      }
    }
  }
  productVariantTransaltion();
  addExtraToVariant()
    .then((result) => {
      console.log("asd222");
      res.redirect("/admin/edit-variant/" + variant.id + "/?edit=true"),
        {
          ext: ext,
        };
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
  const status = req.body.status;
  const updatedSku = req.body.sku;
  const updatedRoName = req.body.roName;
  const updatedHuName = req.body.huName;
  const updatedEnName = req.body.enName;

  // ////itt is nezni req.body.price[i]
  // const updatedExtraPrice = req.body.price;
  // const updatedExtraDiscountedPrice = req.body.discountedPrice;
  // const updatedExtraQuantityMin = req.body.quantityMin;
  // const updatedExtraQuantityMax = req.body.quantityMax;
  // const updatedExtraMandatory = req.body.mandatory;
  // const ext = await req.admin.getExtras();

  async function updateProductVariant() {
    await ProductVariantTranslation.update(
      { name: updatedRoName, sku: updatedSku },

      { where: { productVariantId: vrId, languageId: 1 } }
    );
    await ProductVariantTranslation.update(
      { name: updatedHuName, sku: updatedSku },

      { where: { productVariantId: vrId, languageId: 2 } }
    );
    await ProductVariantTranslation.update(
      { name: updatedEnName, sku: updatedSku },

      { where: { productVariantId: vrId, languageId: 3 } }
    );
  }
  async function add() {
    let a = 2;
    let b = 10;
    const x = a + b;
    console.log(
      "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
      x
    );
  }

  console.log("1");

  updateProductVariant();
  add()
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
  const variant = await ProductVariantTranslation.findAll({
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
