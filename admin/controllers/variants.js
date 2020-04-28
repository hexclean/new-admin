const { validationResult } = require("express-validator/check");
const ProductVariantTranslation = require("../../models/ProductVariantTranslation");
const ProductVariantsExtras = require("../../models/ProductVariantsExtras");
const ProductVariants = require("../../models/ProductVariant");
const ProductVariantExtras = require("../../models/ProductVariantsExtras");
const ProductExtra = require("../../models/Extra");
const Category = require("../../models/VariantCategory");
const ITEMS_PER_PAGE = 15;

exports.getIndex = async (req, res, next) => {
  const page = +req.query.page || 1;
  let totalItems;

  const extras = await ProductExtra.findAll({
    where: {
      adminId: req.admin.id,
    },
  }).then((numExtras) => {
    totalItems = numExtras;
    return ProductExtra.findAll({
      where: {
        adminId: req.admin.id,
      },
      offset: (page - 1) * ITEMS_PER_PAGE,
      limit: ITEMS_PER_PAGE,
    });
  });

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
        extras: extras,
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
  const cat = await Category.findAll();
  console.log(cat);
  res.render("variant/edit-variant", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
    hasError: false,
    ext: ext,
    cat: cat,
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
  const updatedExtraPrice = req.body.price;
  const updatedExtraQuantityMin = req.body.quantityMin;
  const updatedExtraQuantityMax = req.body.quantityMax;
  var filteredStatus = req.body.status.filter(Boolean);

  const variant = await req.admin.createProductVariant({
    sku: sku,
  });
  const ext = await req.admin.getExtras();

  async function productVariantTransaltion() {
    await ProductVariantTranslation.create({
      name: roName,
      languageId: 1,
      productVariantId: variant.id,

      adminId: req.admin.id,
    });
    await ProductVariantTranslation.create({
      name: huName,
      languageId: 2,

      productVariantId: variant.id,
      adminId: req.admin.id,
    });

    await ProductVariantTranslation.create({
      name: enName,
      languageId: 3,

      productVariantId: variant.id,
      adminId: req.admin.id,
    });
  }

  if (Array.isArray(ext)) {
    for (let i = 0; i <= ext.length - 1; i++) {
      await ProductVariantsExtras.create({
        price: updatedExtraPrice[i] || 0,
        discountedPrice: updatedExtraPrice[i] || 0,
        quantityMin: updatedExtraQuantityMin[i] || 0,
        quantityMax: updatedExtraQuantityMax[i] || 0,
        productVariantId: variant.id,
        extraId: extId[i],
        active: filteredStatus[i] == "on" ? 1 : 0,
      });
    }
  }
  productVariantTransaltion()
    .then((result) => {
      console.log("updatedExtraPrice", updatedExtraPrice);

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
  const extId = req.body.extraId;
  const sku = req.body.sku;
  const varId = req.body.variantId;
  const updatedExtraPrice = req.body.price;
  const updatedExtraDiscountedPrice = req.body.discountedPrice;
  const updatedExtraQuantityMin = req.body.quantityMin;
  const updatedExtraQuantityMax = req.body.quantityMax;
  const updatedExtraMandatory = req.body.mandatory;
  var filteredStatus = req.body.status.filter(Boolean);
  const updatedRoName = req.body.roName;
  const updatedHuName = req.body.huName;
  const updatedEnName = req.body.enName;
  const extTranId = req.body.extTranId;
  const ext = await req.admin.getExtras();
  console.log("const varId = req.params.variantId;", varId);
  ProductVariants.findAll({
    include: [
      {
        model: ProductVariantTranslation,
      },
    ],
  })
    .then((variant) => {
      async function msg() {
        await ProductVariantTranslation.update(
          { name: updatedRoName },
          { where: { id: extTranId[0], languageId: 1 } }
        );

        await ProductVariantTranslation.update(
          { name: updatedHuName },
          { where: { id: extTranId[1], languageId: 2 } }
        );

        await ProductVariantTranslation.update(
          { name: updatedEnName },
          { where: { id: extTranId[2], languageId: 3 } }
        );

        console.log("varIdvarIdvarIdvarIdvarIdvarIdvarIdvarId::", varId[0]);

        if (Array.isArray(ext)) {
          for (let i = 0; i <= ext.length - 1; i++) {
            await ProductVariantsExtras.update(
              { price: updatedExtraPrice[i] || 0 },
              { discountedPrice: updatedExtraDiscountedPrice[i] || 0 },
              { quantityMin: updatedExtraQuantityMin[i] || 0 },
              { quantityMax: updatedExtraQuantityMax[i] || 0 },
              { mandatory: updatedExtraMandatory[i] || 0 },
              { productVariantId: variant.id },
              { extraId: extId[i] },
              { active: filteredStatus[i] == "on" ? 1 : 0 }
            );
          }
        }
      }

      msg();

      res.redirect("/admin/vr-index");
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
  const varId = req.params.variantId;
  const ext = await req.admin.getExtras();
  // console.log("varId", varId);
  ProductVariants.findAll({
    where: {
      id: varId,
    },
    include: [
      {
        model: ProductVariantTranslation,
      },
      { model: ProductVariantExtras },
    ],
  })
    .then((variant) => {
      console.log("varId", varId);
      res.render("variant/edit-variant", {
        pageTitle: "Edit Product",
        path: "/admin/edit-product",
        editing: editMode,
        variant: variant,
        hasError: false,
        ext: ext,
        errorMessage: null,
        validationErrors: [],
        extTranslations: variant[0].productVariantTranslations,
        isActive: variant[0].productVariantsExtras,
      });
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
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
