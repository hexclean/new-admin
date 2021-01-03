const ProductVariantsExtras = require("../../models/ProductVariantsExtras");
const Variant = require("../../models/Variant");
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
const VariantPropertyValue = require("../../models/VariantPropertyValue");
const Op = Sequelize.Op;

exports.getIndex = async (req, res, next) => {
  res.render("variant/index", {
    pageTitle: "Admin Products",
    path: "/admin/products",
  });
};

exports.getAddVariant = async (req, res, next) => {
  let languageCode;

  if (req.cookies.language == "ro") {
    languageCode = 1;
  } else if (req.cookies.language == "hu") {
    languageCode = 2;
  } else {
    languageCode = 3;
  }

  const ext = await Extras.findAll({
    where: { restaurantId: req.admin.id },
    include: [
      {
        model: ExtraTranslations,
        where: { languageId: languageCode },
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
    return res.redirect("/admin/variant-index");
  }

  if (checkCategoryLength.length < 2) {
    return res.redirect("/admin/variant-index");
  }

  const cat = await Category.findAll({
    where: {
      restaurantId: req.admin.id,
    },
    include: [
      {
        model: CategoryTranslation,
        where: { languageId: languageCode },
      },
    ],
  });

  res.render("variant/edit-variant", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
    ext: ext,
    cat: cat,
  });
};

exports.postAddVariant = async (req, res, next) => {
  const propertyId = req.body.propertyId;
  const propertyValueId = req.body.propertyValueId;
  const extId = req.body.extraId;

  const sku = req.body.sku;
  const updatedExtraPrice = req.body.price;
  const updatedExtraQuantityMin = req.body.quantityMin;
  const updatedExtraQuantityMax = req.body.quantityMax;
  const categoryId = req.body.categoryId;
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
            model: Variant,
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
  console.log(req.body);
  const variant = await Variant.create({
    sku: sku,
    restaurantId: req.admin.id,
    categoryId: categoryId,
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
        discountedPrice: 1,
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
  await VariantPropertyValue.create({
    variantId: variant.id,
    propertyValueId: propertyValueId,
    propertyId: propertyId,
  });

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
  let languageCode;

  if (req.cookies.language == "ro") {
    languageCode = 1;
  } else if (req.cookies.language == "hu") {
    languageCode = 2;
  } else {
    languageCode = 3;
  }
  const varId = req.params.variantId;
  let categoryId;
  await Variant.findByPk(varId).then((variant) => {
    categoryId = variant.categoryId;
    if (!variant) {
      return res.redirect("/");
    }
  });
  const test3 = await Variant.findAll({
    where: { id: varId },
    include: [{ model: VariantPropertyValue }],
  });
  const productVarToExt = await Extras.findAll({
    where: { restaurantId: req.admin.id },
    include: [
      {
        model: ExtraTranslations,
        where: { languageId: languageCode },
      },

      { model: ProductVariantsExtras },
    ],
  });

  const ext = await Extras.findAll({
    where: { restaurantId: req.admin.id },
    include: [
      {
        model: ExtraTranslations,
        where: { languageId: languageCode },
      },
    ],
  });

  const result = await CategoryProperty.findAll({
    where: { id: categoryId },
    include: [
      {
        model: Property,
        include: [
          {
            model: PropertyTranslation,
            where: { languageId: languageCode },
          },
          {
            model: PropertyValue,
            include: [{ model: PropertyValueTranslation }],
          },
        ],
      },
    ],
  });

  const cat = await Category.findAll({
    where: { restaurantId: req.admin.id },
    include: [
      {
        model: CategoryTranslation,
        where: { languageId: languageCode },
      },
    ],
  });

  const resultProp = await CategoryProperty.findAll({
    where: { restaurantId: req.admin.id, categoryId: categoryId, active: 1 },
    include: [
      {
        model: Property,
        include: [
          {
            model: PropertyTranslation,
            where: { languageId: languageCode },
          },
          {
            model: PropertyValue,
            include: [
              {
                model: PropertyValueTranslation,
                where: { languageId: languageCode },
              },
            ],
          },
        ],
      },
    ],
  });

  await Extras.findAll({
    where: { restaurantId: req.admin.id },
    include: [
      {
        model: ExtraTranslations,
        where: { languageId: languageCode },
      },

      {
        model: ProductVariantsExtras,
        include: [
          {
            model: Variant,
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
        ext: ext,
        cat: cat,
        resultProp: resultProp,
        result: result,
        currentLanguage: 1,
        productVarToExt: productVarToExt,
        isActive: variant[0].ProductVariantsExtras,
        testing3: test3[0].VariantPropertyValues[0].propertyValueId,
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
  const categoryId = req.body.categoryId;
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
  await VariantPropertyValue.update(
    {
      propertyValueId: req.body.propertyValueId,
      propertyId: req.body.propertyId,
    },
    {
      where: {
        variantId: dasd,
      },
    }
  );

  Variant.findAll()
    .then((variant) => {
      async function msg() {
        await Variant.findByPk(varId).then((variant) => {
          variant.sku = updatedSku;
          variant.maxOption = maxOption;
          variant.categoryId = categoryId;
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
                discountedPrice: 1,
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
      console.log(req.body);
      res.redirect("/admin/variant-index");
    })
    .catch((err) => {
      console.log(err);
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getFilteredProperty = async (req, res, next) => {
  var categoryId = req.params.categoryId;
  let languageCode;

  if (req.cookies.language == "ro") {
    languageCode = 1;
  } else if (req.cookies.language == "hu") {
    languageCode = 2;
  } else {
    languageCode = 3;
  }
  const result = await CategoryProperty.findAll({
    where: { restaurantId: req.admin.id, categoryId: categoryId, active: 1 },
    include: [
      {
        model: Property,
        include: [
          {
            model: PropertyTranslation,
            where: { languageId: languageCode },
          },
          {
            model: PropertyValue,
            include: [
              {
                model: PropertyValueTranslation,
                where: { languageId: languageCode },
              },
            ],
          },
        ],
      },
    ],
  });

  try {
    res.render("variant/current-property", {
      result: result,
      editing: false,
    });
  } catch (error) {
    console.log(error);
    error.httpStatusCode = 500;
    return next(error);
  }
};

exports.getTest = async (req, res, next) => {
  var categoryId = req.params.categoryId;
  var languageId;
  var currentLanguage = req.cookies.language;

  if (currentLanguage == "ro") {
    languageId = 1;
  } else if (currentLanguage == "hu") {
    languageId = 2;
  } else {
    languageId = 3;
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
      languageId: languageId,
    });
  } catch (error) {
    console.log(error);
    error.httpStatusCode = 500;
    return next(error);
  }
};
