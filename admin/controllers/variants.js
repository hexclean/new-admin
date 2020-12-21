const ProductVariantsExtras = require("../../models/ProductVariantsExtras");
const ProductVariants = require("../../models/Variant");
const Category = require("../../models/Category");
const CategoryTranslation = require("../../models/CategoryTranslation");
const Extras = require("../../models/Extra");
const ExtraTranslations = require("../../models/ExtraTranslation");
const ProductsFinal = require("../../models/ProductFinal");
const Products = require("../../models/Product");
const Sequelize = require("sequelize");
const CategoryProperty = require("../../models/CategoryProperty");
const Property = require("../../models/Property");
const PropertyValue = require("../../models/PropertyValue");
const PropertyTranslation = require("../../models/PropertyTranslation");
const PropertyValueTranslation = require("../../models/PropertyValueTranslation");
const Op = Sequelize.Op;

exports.getIndex = async (req, res, next) => {
  res.render("variant/index", {
    pageTitle: "Admin Products",
    path: "/admin/products",
  });
};

exports.getAddVariant = async (req, res, next) => {
  let currentExtraName = [];
  let currentCategoryName = [];
  var currentLanguage = req.cookies.language;

  if (currentLanguage == "ro") {
    currentCategoryName = 0;
  } else if (currentLanguage == "hu") {
    currentCategoryName = 1;
  } else {
    currentCategoryName = 2;
  }
  const checkCategoryProperty = await CategoryProperty.findAll({
    where: { restaurantId: req.admin.id, categoryId: 1 },
    include: [
      {
        model: Property,
        include: [
          {
            model: PropertyTranslation,
          },
        ],
      },
    ],
  });

  const checkCategoryPropertyValue = await CategoryProperty.findAll({
    where: { restaurantId: req.admin.id, categoryId: 1 },
    include: [
      {
        model: Property,
        include: [
          {
            model: PropertyTranslation,
          },
        ],
        include: [
          {
            model: PropertyValue,
            include: [
              {
                model: PropertyValueTranslation,
              },
            ],
          },
        ],
      },
    ],
  });

  let finalProperty = [];
  for (let i = 0; i < checkCategoryPropertyValue.length; i++) {
    const newArray = checkCategoryPropertyValue[i].Property.PropertyValues;
    finalProperty = newArray[0].PropertyValueTranslations;
    console.log(newArray[0].PropertyValueTranslations[0].name);
  }

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
      currentExtraName[i] = ext[i].ExtraTranslations[0].name;
    } else if (currentLanguage == "hu") {
      currentExtraName[i] = ext[i].ExtraTranslations[1].name;
    } else {
      currentExtraName[i] = ext[i].ExtraTranslations[2].name;
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
    finalProperty: finalProperty,
    checkCategoryProperty: checkCategoryProperty,
    checkCategoryPropertyValue: checkCategoryPropertyValue,
  });
};

exports.postAddVariant = async (req, res, next) => {
  const extId = req.body.extraId;
  let adminCommission = req.admin.commission;
  if (req.admin.commission >= 10) {
    adminCommission / 100;
  } else {
    adminCommission / 10;
  }

  const sku = req.body.sku;
  const updatedExtraPrice = req.body.price;
  const updatedExtraQuantityMin = req.body.quantityMin;
  const updatedExtraQuantityMax = req.body.quantityMax;
  const categoryRo = req.body.categoryRo;
  const maxOption = req.body.maxOption;
  const filteredStatus = req.body.status.filter(Boolean);
  const filteredOptions = req.body.statusOption.filter(Boolean);

  const ext = await Extras.findAll({
    where: { restaurantId: req.admin.id },
    include: [
      {
        model: ExtraTranslations,
      },

      {
        model: ProductVariantsExtras,
        include: [
          {
            model: ProductVariants,
          },
        ],
      },
    ],
  });

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

  const variant = await ProductVariants.create({
    sku: sku,
    restaurantId: req.admin.id,
    categoryId: categoryRo,
    maxOption: maxOption,
  });

  async function productVariantTranslation() {
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
        discountedPrice: updatedExtraPrice[i] * adminCommission || 0,
        quantityMin: updatedExtraQuantityMin[i] || 0,
        quantityMax: updatedExtraQuantityMax[i] || 0,
        variantId: variant.id,
        extraId: extId[i],
        active: filteredStatus[i] == "on" ? 1 : 0,
        restaurantId: req.admin.id,
        requiredExtra: filteredOptions[i] == "on" ? 1 : 0,
      });
    }
  }
  productVariantTranslation()
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
    categoryList = cat[i].CategoryTranslations[0];
  }

  for (let i = 0; i < productVarToExt.length; i++) {
    var currentLanguage = req.cookies.language;

    if (currentLanguage == "ro") {
      currentCategoryName = 1;
    } else if (currentLanguage == "hu") {
      currentCategoryName = 2;
    } else {
      currentCategoryName = 3;
    }
  }

  await Extras.findAll({
    where: { restaurantId: req.admin.id },
    include: [
      {
        model: ExtraTranslations,
      },

      {
        model: ProductVariantsExtras,
        include: [
          {
            model: ProductVariants,
            where: {
              variantId: varId,
            },
            where: {
              id: varId,
              restaurantId: req.admin.id,
            },
          },
        ],
      },
    ],
  })
    .then((variant) => {
      res.render("variant/edit-variant", {
        pageTitle: "Edit Product",
        path: "/admin/edit-product",
        editing: editMode,
        varId: varId,
        variant: variant,
        variantIdByParams: varId,
        categoryIdJoin: cat,
        hasError: false,
        ext: ext,
        categoryList: categoryList,
        cat: cat,
        currentLanguage: 1,
        testSelect: "Alma",
        checkCategoryProperty: 6,
        checkCategoryPropertyValue: 8,
        productVarToExt: productVarToExt,
        errorMessage: null,
        validationErrors: [],
        isActive: variant[0].ProductVariantsExtras,
        currentExtraName: currentExtraName,
      });
    })
    .catch((err) => {
      const error = new Error(err);
      console.log(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.postEditVariant = async (req, res, next) => {
  const extId = req.body.extraId;
  let adminCommission = req.admin.commission;
  if (req.admin.commission >= 10) {
    adminCommission / 100;
  } else {
    adminCommission / 10;
  }

  const updatedSku = req.body.sku;
  const varId = req.body.variantId;
  const updatedExtraPrice = req.body.price;
  const updatedExtraQuantityMin = req.body.quantityMin;
  const updatedExtraQuantityMax = req.body.quantityMax;
  const filteredStatus = req.body.status.filter(Boolean);
  const filteredOptions = req.body.statusOption.filter(Boolean);
  const maxOption = req.body.maxOption;
  const categoryRo = req.body.categoryRo;
  const Op = Sequelize.Op;
  const dasd = req.body.varId;
  let variantId = [dasd];
  console.log(req.body);
  const productVarToExt = await ProductVariantsExtras.findAll({
    where: {
      variantId: {
        [Op.in]: variantId,
      },
    },
  });

  ProductVariants.findAll()
    .then((variant) => {
      async function msg() {
        await ProductVariants.findByPk(varId).then((variant) => {
          variant.sku = updatedSku;
          variant.maxOption = maxOption;
          variant.categoryId = categoryRo;
          return variant.save();
        });

        if (Array.isArray(productVarToExt)) {
          const Op = Sequelize.Op;
          for (let i = 0; i <= productVarToExt.length - 1; i++) {
            let extrasIds = [extId[i]];
            let variantId = [varId];
            // await ExtraHasAllergen.update(
            //   {
            //     active: filteredStatus[i] == "on" ? 1 : 0,
            //   },
            //   {
            //     where: {
            //       variantId: {
            //         [Op.in]: variantId,
            //       },
            //     },
            //   }
            // );
            await ProductVariantsExtras.update(
              {
                price: updatedExtraPrice[i] || 0,
                quantityMin: updatedExtraQuantityMin[i] || 0,
                quantityMax: updatedExtraQuantityMax[i] || 0,
                discountedPrice: updatedExtraPrice[i] * adminCommission || 0,
                active: filteredStatus[i] == "on" ? 1 : 0,
                requiredExtra: filteredOptions[i] == "on" ? 1 : 0,
              },
              {
                where: {
                  extraId: {
                    [Op.in]: extrasIds,
                  },
                  variantId: {
                    [Op.in]: variantId,
                  },
                },
              }
            );
          }
        }
      }
      msg();
      res.redirect("/admin/variant-index");
    })
    .catch((err) => {
      console.log(err);
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

exports.getFilterExtras = async (req, res, next) => {
  var extraName = req.params.extraId;
  var currentExtraName;
  var currentLanguage = req.cookies.language;

  if (extraName.length == 1) {
    extraName = [];
  }

  if (currentLanguage == "ro") {
    currentExtraName = 1;
  } else if (currentLanguage == "hu") {
    currentExtraName = 2;
  } else {
    currentExtraName = 3;
  }

  await Extras.findAll({
    where: {
      restaurantId: req.admin.id,
    },
    include: [
      {
        model: ExtraTranslations,
        where: {
          name: { [Op.like]: "%" + extraName + "%" },
          languageId: currentExtraName,
        },
      },
    ],
  })

    .then((extra) => {
      res.render("variant/searchedExtra", {
        ext: extra,
        editing: false,
        extras: extra,
      });
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getFilteredProperty = async (req, res, next) => {
  var categoryId = req.params.categoryId;
  var currentExtraName;
  var currentLanguage = req.cookies.language;

  if (currentLanguage == "ro") {
    currentExtraName = 1;
  } else if (currentLanguage == "hu") {
    currentExtraName = 2;
  } else {
    currentExtraName = 3;
  }

  const result = await CategoryProperty.findAll({
    where: { id: categoryId },
    include: [
      {
        model: Property,
        include: [
          {
            model: PropertyTranslation,
          },
          {
            model: PropertyValue,
            include: [{ model: PropertyValueTranslation }],
          },
        ],
      },
    ],
  });

  try {
    res.render("variant/current-property", {
      result: result,
      editing: false,
      // extras: extra,
    });
    // })
  } catch (error) {
    console.log(error);
    error.httpStatusCode = 500;
    return next(error);
  }
};
