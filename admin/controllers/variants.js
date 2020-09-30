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
const Sequelize = require("sequelize");
const Allergen = require("../../models/Allergen");
const ITEMS_PER_PAGE = 4;
const Op = Sequelize.Op;

exports.getIndex = async (req, res, next) => {
  const page = +req.query.page || 1;
  let totalItems;
  let currentExtraName = [];
  let currentCategoryName = [];

  const checkAllergenLength = await Allergen.findAll({
    where: {
      restaurantId: req.admin.id,
    },
  });

  const checkExtraLength = await Extras.findAll({
    where: { restaurantId: req.admin.id },
  });

  const checkCategoryLength = await Category.findAll({
    where: { restaurantId: req.admin.id },
  });

  const category = await Category.findAll({
    where: {
      restaurantId: req.admin.id,
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
        restaurantId: req.admin.id,
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

  const extras = await ProductExtra.findAll({
    where: {
      restaurantId: req.admin.id,
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
        restaurantId: req.admin.id,
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
        checkAllergenLength: checkAllergenLength,
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
  let currentCategoryName = [];

  const ext = await Extras.findAll({
    where: { restaurantId: req.admin.id },
    include: [
      {
        model: ExtraTranslations,
      },
    ],
  });

  const checkExtraLength = await Extras.findAll({
    where: { restaurantId: req.admin.id },
  });

  const checkCategoryLength = await Category.findAll({
    where: { restaurantId: req.admin.id },
  });

  if (checkExtraLength.length === 0) {
    return res.redirect("/admin/vr-index");
  }

  if (checkCategoryLength.length === 0) {
    return res.redirect("/admin/vr-index");
  }

  const cat = await Category.findAll({
    where: {
      restaurantId: req.admin.id,
    },
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
  for (let i = 0; i < cat.length; i++) {
    var currentLanguage = req.cookies.language;

    if (currentLanguage == "ro") {
      currentCategoryName = 0;
    } else if (currentLanguage == "hu") {
      currentCategoryName = 1;
    } else {
      currentCategoryName = 2;
    }
  }

  res.render("variant/edit-variant", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
    hasError: false,
    ext: ext,
    currentExtraName: currentExtraName,
    currentLanguage: currentCategoryName,
    cat: cat,
    errorMessage: null,
    validationErrors: [],
  });
};

exports.postAddVariant = async (req, res, next) => {
  const extId = req.body.extraId;
  const sku = req.body.sku;
  const updatedExtraPrice = req.body.price;
  const updatedExtraQuantityMin = req.body.quantityMin;
  const updatedExtraQuantityMax = req.body.quantityMax;
  const categoryRo = req.body.categoryRo;

  const maxOption = req.body.maxOption;
  const filteredStatus = req.body.status.filter(Boolean);
  const filteredOptions = req.body.statusOption.filter(Boolean);
  const ext = await req.admin.getExtras();

  let productId = await Products.findAll({
    where: { restaurantId: req.admin.id },
  });

  const cat = await Category.findAll({
    where: { restaurantId: req.admin.id },
    include: [
      {
        model: CategoryTranslation,
      },
    ],
  });

  const variant = await req.admin.createProductVariant({
    sku: sku,
    categoryId: categoryRo,
    maxOption: maxOption,
  });

  async function productVariantTransaltion() {
    for (let i = 0; i <= productId.length - 1; i++) {
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
        restaurantId: req.admin.id,
        requiredExtra: filteredOptions[i] == "on" ? 1 : 0,
      });
    }
  }
  productVariantTransaltion()
    .then((result) => {
      res.redirect("/admin/variant-index"),
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
  const updatedSku = req.body.sku;
  const varId = req.body.variantId;
  const updatedExtraPrice = req.body.price;
  const updatedExtraQuantityMin = req.body.quantityMin;
  const updatedExtraQuantityMax = req.body.quantityMax;
  const filteredStatus = req.body.status.filter(Boolean);
  const filteredOptions = req.body.statusOption.filter(Boolean);

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

  ProductVariants.findAll()
    .then((variant) => {
      async function msg() {
        await ProductVariants.findByPk(varId).then((variant) => {
          variant.sku = updatedSku;
          return variant.save();
        });

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
                requiredExtra: filteredOptions[i] == "on" ? 1 : 0,
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

  await ProductVariants.findByPk(varId).then((variant) => {
    if (!variant) {
      return res.redirect("/");
    }
  });
  const productVarToExt = await Extras.findAll({
    where: { restaurantId: req.admin.id },
    include: [
      {
        model: ExtraTranslations,
      },
      { model: ProductVariantsExtras },
    ],
  });

  const testing3 = await ProductVariants.findAll({
    where: { restaurantId: req.admin.id },
    include: [
      {
        as: "catToVar",
        model: Category,
        include: [
          {
            model: CategoryTranslation,
          },
        ],
      },
    ],
  });

  const maxOptionData = await ProductVariants.findByPk(varId);
  // maxOptionData.maxOption;
  console.log("categoryList", maxOptionData.maxOption);
  const testing44444 = await ProductVariants.findAll({
    where: { restaurantId: req.admin.id, id: varId },
    include: [
      {
        as: "catToVar",
        model: Category,
        include: [
          {
            model: CategoryTranslation,
          },
        ],
      },
    ],
  });
  let arraytest = [];
  for (let i = 0; i < testing44444.length; i++) {
    arraytest = testing44444[i].catToVar.productCategoryTranslations[0].name;
  }

  const ext = await Extras.findAll({
    where: { restaurantId: req.admin.id },
    include: [
      {
        model: ExtraTranslations,
      },
    ],
  });

  const cat = await Category.findAll({
    where: { restaurantId: req.admin.id },
    include: [
      {
        model: CategoryTranslation,
        where: { restaurantId: req.admin.id },
      },
    ],
  });

  let categoryList = [];
  for (let i = 0; i < cat.length; i++) {
    categoryList = cat[i].productCategoryTranslations[0];
  }

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
      restaurantId: req.admin.id,
    },
    include: [{ model: ProductVariantExtras }],
  })
    .then((variant) => {
      res.render("variant/edit-variant", {
        pageTitle: "Edit Product",
        path: "/admin/edit-product",
        editing: editMode,
        maxOptionData: maxOptionData.maxOption,
        varId: varId,
        variant: variant,
        variantIdByParams: varId,
        categoryIdJoin: cat,
        hasError: false,
        ext: ext,
        categoryList: categoryList,
        arraytest: arraytest,
        cat: cat,
        testSelect: "Alma",
        testing3: testing3,
        productVarToExt: productVarToExt,
        errorMessage: null,
        validationErrors: [],
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
