const ProductVariantTranslation = require("../../models/ProductVariantTranslation");
const ProductVariantsExtras = require("../../models/ProductVariantsExtras");
const ProductVariants = require("../../models/ProductVariant");
const ProductVariantExtras = require("../../models/ProductVariantsExtras");
const ProductExtra = require("../../models/Extra");
const Category = require("../../models/ProductCategory");
const CategoryTranslation = require("../../models/ProductCategoryTranslation");
const Extras = require("../../models/Extra");
const ExtraTranslations = require("../../models/ExtraTranslation");
const ProductsFinal = require("../../models/ProductFinal");
const Products = require("../../models/Product");
var Sequelize = require("sequelize");

const ITEMS_PER_PAGE = 14;

exports.searchExtraByKeyword = async (req, res, next) => {
  res.render("search/index", {
    pageTitle: "Admin Products",
    path: "/admin/products",
  });
  const Op = Sequelize.Op;
  const lang = req.query.language;
  const keyword = req.query.keyword;
  if (lang == "hu") {
    const lang2 = 1;
    await Extras.findAll({
      where: {
        adminId: req.admin.id,
      },
      raw: true,
      // nest: true,

      include: {
        model: ExtraTranslations,
        where: {
          name: { [Op.like]: "%" + keyword + "%" },
          languageId: lang2,
        },
        raw: true,
      },
    })
      .then((searchedExtra) => {
        console.log(searchedExtra);
      })

      .catch((err) => {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
      });
  }
};
exports.getIndex = async (req, res, next) => {
  const page = +req.query.page || 1;
  let totalItems;
  let currentExtraName = [];
  let currentCategoryName = [];
  const checkExtraLength = await Extras.findAll({
    where: { adminId: req.admin.id },
  });

  const checkCategoryLength = await Category.findAll({
    where: { adminId: req.admin.id },
  });

  const category = await Category.findAll({
    where: {
      adminId: req.admin.id,
    },
    include: [
      {
        model: CategoryTranslation,
      },
    ],
  }).then((numExtras) => {
    totalItems = numExtras;
    return Category.findAll({
      where: {
        adminId: req.admin.id,
      },
      include: [
        {
          model: CategoryTranslation,
        },
      ],
      offset: (page - 1) * ITEMS_PER_PAGE,
      limit: ITEMS_PER_PAGE,
    });
  });
  console.log("catL", category);
  const extras = await ProductExtra.findAll({
    where: {
      adminId: req.admin.id,
    },
    include: [
      {
        model: ExtraTranslations,
      },
    ],
  }).then((numExtras) => {
    totalItems = numExtras;
    return ProductExtra.findAll({
      where: {
        adminId: req.admin.id,
      },
      include: [
        {
          model: ExtraTranslations,
        },
      ],
      offset: (page - 1) * ITEMS_PER_PAGE,
      limit: ITEMS_PER_PAGE,
    });
  });

  for (let i = 0; i < extras.length; i++) {
    var currentLanguage = req.cookies.language;

    if (currentLanguage == "ro") {
      currentExtraName[i] = extras[i].extraTranslations[0].name;
    } else if (currentLanguage == "hu") {
      currentExtraName[i] = extras[i].extraTranslations[1].name;
    } else {
      currentExtraName[i] = extras[i].extraTranslations[2].name;
    }
  }

  for (let i = 0; i < category.length; i++) {
    var currentLanguage = req.cookies.language;

    if (currentLanguage == "ro") {
      currentCategoryName[i] = category[i].productCategoryTranslations[0].name;
    } else if (currentLanguage == "hu") {
      currentCategoryName[i] = category[i].productCategoryTranslations[1].name;
    } else {
      currentCategoryName[i] = category[i].productCategoryTranslations[2].name;
    }
  }

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
        checkExtraLength: checkExtraLength,
        checkCategoryLength: checkCategoryLength,
        hasNextPage: ITEMS_PER_PAGE * page < totalItems.length,
        hasPreviousPage: page > 1,
        nextPage: page + 1,
        previousPage: page - 1,
        lastPage: Math.ceil(totalItems.length / ITEMS_PER_PAGE),
        vr: vr,
        cat: category,
        extras: extras,
        currentExtraName: currentExtraName,
        currentCategoryName: currentCategoryName,
      });
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getAddVariant = async (req, res, next) => {
  let currentExtraName = [];
  const ext = await Extras.findAll({
    where: { adminId: req.admin.id },
    include: [
      {
        model: ExtraTranslations,
      },
    ],
  });
  console.log("ext", ext);
  const checkExtraLength = await Extras.findAll({
    where: { adminId: req.admin.id },
  });

  const checkCategoryLength = await Category.findAll({
    where: { adminId: req.admin.id },
  });

  if (checkExtraLength.length === 0) {
    return res.redirect("/admin/vr-index");
  }

  if (checkCategoryLength.length === 0) {
    return res.redirect("/admin/vr-index");
  }

  const cat = await Category.findAll({
    include: [
      {
        model: CategoryTranslation,
      },
    ],
  });
  for (let i = 0; i < ext.length; i++) {
    var currentLanguage = req.cookies.language;

    if (currentLanguage == "ro") {
      currentExtraName[i] = ext[i].extraTranslations[0].name;
    } else if (currentLanguage == "hu") {
      currentExtraName[i] = ext[i].extraTranslations[1].name;
    } else {
      currentExtraName[i] = ext[i].extraTranslations[2].name;
    }
  }
  // for (let i = 0; i < cat.length; i++) {
  //   if (cat[i].id === cat[i].productCategoryTranslations[0].productCategoryId) {
  //     console.log("cat[i].id", cat[i].id);
  //     console.log(
  //       "cat[i].productCategoryTranslations[0].productCategoryId",
  //       cat[i].productCategoryTranslations[0].productCategoryId
  //     );
  //     console.log("YES");
  //   } else {
  //     console.log("NO");
  //   }
  // }
  // console.log(cat[0].id);
  // console.log(cat[0].productCategoryTranslations[0].productCategoryId);
  res.render("variant/edit-variant", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
    hasError: false,
    ext: ext,
    currentExtraName: currentExtraName,
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
  const categoryRo = req.body.categoryRo;
  const categoryHu = req.body.categoryHu;
  const categoryEn = req.body.categoryEn;

  //
  const updatedExtraPrice = req.body.price;
  const updatedExtraQuantityMin = req.body.quantityMin;
  const updatedExtraQuantityMax = req.body.quantityMax;
  var filteredStatus = req.body.status.filter(Boolean);
  const ext = await req.admin.getExtras();

  let productId = await Products.findAll({
    where: { adminId: req.admin.id },
  });

  const cat = await Category.findAll({
    where: { adminId: req.admin.id },
    include: [
      {
        model: CategoryTranslation,
      },
    ],
  });

  const variant = await req.admin.createProductVariant({
    sku: sku,
    active: 1,
  });

  async function productVariantTransaltion() {
    await ProductVariantTranslation.create({
      name: roName,
      languageId: 1,
      productVariantId: variant.id,
      categoryId: categoryRo,
      adminId: req.admin.id,
    });
    await ProductVariantTranslation.create({
      name: huName,
      languageId: 2,
      categoryId: categoryHu,
      productVariantId: variant.id,
      adminId: req.admin.id,
    });

    await ProductVariantTranslation.create({
      name: enName,
      languageId: 3,
      categoryId: categoryEn,
      productVariantId: variant.id,
      adminId: req.admin.id,
    });

    for (let i = 0; i <= productId.length - 1; i++) {
      console.log("productId[i].id", productId[i].id);
      await ProductsFinal.create({
        price: 0,
        active: 0,
        productId: productId[i].id,
        variantId: variant.id,
      });
    }
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
        adminId: req.admin.id,
      });
    }
  }
  productVariantTransaltion()
    .then((result) => {
      console.log("updatedExtraPrice", updatedExtraPrice);

      res.redirect("/admin/vr-index"),
        {
          ext: ext,
          cat: cat,
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
  console.log("extId", extId);
  const updatedSku = req.body.sku;
  const varId = req.body.variantId;
  const updatedExtraPrice = req.body.price;
  const updatedExtraQuantityMin = req.body.quantityMin;
  const updatedExtraQuantityMax = req.body.quantityMax;
  var filteredStatus = req.body.status.filter(Boolean);
  const updatedRoName = req.body.roName;
  const updatedHuName = req.body.huName;
  const updatedEnName = req.body.enName;
  const extTranId = req.body.extTranId;
  const Op = Sequelize.Op;
  const dasd = req.body.varId;
  let variantId = [dasd];
  const productVarToExt = await ProductVariantsExtras.findAll({
    where: {
      productVariantId: {
        [Op.in]: variantId,
      },
    },
  });

  const ext = await req.admin.getExtras();
  ProductVariants.findAll({
    include: [
      {
        model: ProductVariantTranslation,
      },
    ],
  })
    .then((variant) => {
      async function msg() {
        await ProductVariants.findByPk(varId).then((variant) => {
          variant.sku = updatedSku;
          return variant.save();
        });

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

        if (Array.isArray(productVarToExt)) {
          const Op = Sequelize.Op;
          for (let i = 0; i <= productVarToExt.length - 1; i++) {
            let extrasIds = [extId[i]];
            let variantId = [varId];
            await ProductVariantsExtras.update(
              {
                price: updatedExtraPrice[i] || 0,
                quantityMin: updatedExtraQuantityMin[i] || 0,
                quantityMax: updatedExtraQuantityMax[i] || 0,
                discountedPrice: updatedExtraPrice[i] * 0.8 || 0,
                active: filteredStatus[i] == "on" ? 1 : 0,
              },
              {
                where: {
                  extraId: {
                    [Op.in]: extrasIds,
                  },
                  productVariantId: {
                    [Op.in]: variantId,
                  },
                },
              }
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
  let currentExtraName = [];
  const varId = req.params.variantId;
  let variantId = [varId];
  const Op = Sequelize.Op;

  const productVarToExt = await Extras.findAll({
    where: { adminId: req.admin.id },
    include: [
      {
        model: ExtraTranslations,
      },
      { model: ProductVariantsExtras },
    ],
  });
  console.log("productVarToExt", productVarToExt);
  // const productVarToExt = await ProductVariantsExtras.findAll({
  //   where: {
  //     productVariantId: {
  //       [Op.in]: variantId,
  //     },
  //   },
  // });

  const ext = await Extras.findAll({
    where: { adminId: req.admin.id },
    include: [
      {
        model: ExtraTranslations,
      },
    ],
  });

  const cat = await Category.findAll({
    include: [
      {
        model: CategoryTranslation,
      },
      {
        model: ProductVariantTranslation,
        // where: { productVariantId: varId },
      },
    ],
  });
  // let test = cat[0].productCategoryTranslations[0].productCategoryId;
  // console.log(
  //   "cat[0].productCategoryTranslations[0]",
  //   cat[0].productCategoryTranslations[0]
  // );
  // console.log(test[0].id);
  // let categoryIdJoin = cat[0].productVariantTranslations[0].categoryId;
  // console.log("categoryIdJoin", categoryIdJoin);
  // console.log("categoryIdJoin", categoryIdJoin);
  // console.log(cat[0].productVariantTranslations);
  // for (let i = cat.length; i >= 0; i--) {
  //   // console.log(
  //   //   "cat[0].productVariantTranslations[0].productVariantId",
  //   //   cat[0].productVariantTranslations[0].productVariantId
  //   // );

  //   if (
  //     1 == 1
  //     // cat[0].productCategoryTranslations[0].productCategoryId == 1
  //     // cat[i].productVariantTranslations[0].productVariantId == 2
  //     // cat[i].productCategoryTranslation[0].categoryId == 3
  //   ) {
  //     // console.log(cat[0].productCategoryTranslations);
  //     console.log("i", i);
  //     // console.log(
  //     //   "cat[i]",
  //     //   cat[i].productCategoryTranslations[i].productCategoryId
  //     // );
  //     // console.log("yes", cat[i].productCategoryTranslations[i].name);
  //     // console.log("yes_ID:", cat[i].productCategoryTranslations[i].id);
  //   } else {
  //     // next();
  //     console.log("no");
  //   }
  // }
  // console.log(cat);
  // console.log(
  //   "cat[0].productVariantTranslations",
  //   cat[0].productVariantTranslations
  // );
  // console.log(
  //   "cat[0].productCategoryTranslations",
  //   cat[0].productCategoryTranslations
  // );
  // console.log("cat", cat[0].productCategoryTranslations[0].productCategoryId);
  for (let i = 0; i < productVarToExt.length; i++) {
    var currentLanguage = req.cookies.language;

    if (currentLanguage == "ro") {
      currentExtraName[i] = productVarToExt[i].extraTranslations[0].name;
    } else if (currentLanguage == "hu") {
      currentExtraName[i] = productVarToExt[i].extraTranslations[1].name;
    } else {
      currentExtraName[i] = productVarToExt[i].extraTranslations[2].name;
    }
  }

  ProductVariants.findAll({
    where: {
      id: varId,
      adminId: req.admin.id,
    },
    include: [
      {
        model: ProductVariantTranslation,
      },
      { model: ProductVariantExtras },
    ],
  })
    .then((variant) => {
      res.render("variant/edit-variant", {
        pageTitle: "Edit Product",
        path: "/admin/edit-product",
        editing: editMode,
        test: 2,
        varId: varId,
        variant: variant,
        variantIdByParams: varId,
        categoryIdJoin: cat,
        hasError: false,
        ext: ext,
        cat: cat,
        productVarToExt: productVarToExt,
        errorMessage: null,
        validationErrors: [],
        extTranslations: variant[0].productVariantTranslations,
        isActive: variant[0].productVariantsExtras,
        currentExtraName: currentExtraName,
      });
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
      product.active = 0;
      return product.save();
    })
    .then((result) => {
      res.redirect("/admin/vr-index");
    })
    .catch((err) => console.log(err));
};
