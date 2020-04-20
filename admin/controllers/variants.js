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
  const extraChId = req.body.extraChId;
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
      adminId: 1,
    });
    await ProductVariantTranslation.create({
      name: huName,
      languageId: 2,
      sku: sku,
      productVariantId: variant.id,
      adminId: 1,
    });

    await ProductVariantTranslation.create({
      name: enName,
      languageId: 3,
      sku: sku,
      productVariantId: variant.id,
      adminId: 1,
    });
  }
  // console.log(req.body);

  // async function addExtraToVariant() {
  if (Array.isArray(ext)) {
    // console.log(updatedExtraPrice[0]);
    console.log("status", status);
    for (let i = 0; i <= ext.length - 1; i++) {
      console.log(ext.length);
      console.log(updatedExtraPrice[i]);
      await ProductVariantsExtras.create({
        price: updatedExtraPrice[i] || 0,
        discountedPrice: updatedExtraDiscountedPrice[i] || 0,
        quantityMin: updatedExtraQuantityMin[i] || 0,
        quantityMax: updatedExtraQuantityMax[i] || 0,
        mandatory: updatedExtraMandatory[i] || 0,
        productVariantId: variant.id,
        extraId: extId[i],
        active: typeof status !== "undefined" && status[i] == "on" ? 1 : 0,
      });
    }
    console.log(req.body.ext);

    // }
  }
  productVariantTransaltion()
    .then((result) => {
      console.log("asd222");
      res.redirect("/admin/vr-index"),
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

  updateProductVariant()
    .then((result) => {
      res.redirect("/"), {};
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
  const ext = await req.admin.getExtras();
  await ProductVariantTranslation.findAll({
    include: [
      {
        model: ProductVariants,
        as: "TheTranslation",
      },
    ],
  })
    .then((variant) => {
      if (!variant) {
        return res.redirect("/");
      }
      console.log(variant);
      console.log(variant);
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
    })
    .catch((err) => console.log(err));
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

exports.postDeleteVariant = (req, res, next) => {
  const prodId = req.body.variantId;
  ProductVariants.findByPk(prodId)
    .then((product) => {
      return product.destroy();
    })
    .then((result) => {
      console.log("DESTROYED PRODUCT");
      res.redirect("/admin/vr-index");
    })
    .catch((err) => console.log(err));
};
