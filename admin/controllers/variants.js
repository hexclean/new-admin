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
const Extra = require("../../models/Extra");
const Op = Sequelize.Op;
const { getLanguageCode } = require("../../shared/language");
// GET
// Variáns oldal létrehozás betöltése
exports.getAddVariant = async (req, res, next) => {
  // Változók deklarálása
  const languageCode = getLanguageCode(req.cookies.language);
  let restaurantId = req.admin.id;

  // Lekérem az étterem összes extráit
  const ext = await Extras.findAll({
    where: { restaurantId: restaurantId },
    include: [
      {
        model: ExtraTranslations,
        where: { languageId: languageCode },
      },
    ],
  });

  // Lekérem az étteremhez tartozó karegóriákat
  const cat = await Category.findAll({
    where: {
      restaurantId: restaurantId,
    },
    include: [
      {
        model: CategoryTranslation,
        where: { languageId: languageCode },
      },
    ],
  });

  // Le kell ellenőrizni, hogy az étteremnek van-e már létrehozva extra és kategóriája
  if (ext.length < 2 || cat.length < 2) {
    return res.redirect("/admin/variant-index");
  }

  // Átadom a lekért adatokat a HTML fájlnak
  res.render("variant/edit-variant", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
    ext: ext,
    cat: cat,
  });
};

// POST
// Variáns létrehozáa
exports.postAddVariant = async (req, res, next) => {
  // Változók deklarálása
  const propertyId = req.body.propertyId;
  const propertyValueId = req.body.propertyValueId;
  const extId = req.body.extraId;
  const sku = req.body.sku;
  const categoryId = req.body.categoryId;
  const maxOption = req.body.maxOption;
  const filteredStatus = req.body.status.filter(Boolean);
  const filteredOptions = req.body.statusOption.filter(Boolean);
  const restaurantId = req.admin.id;
  let variantId;
  // Szerver oldali validáció
  if (extId.length == 0 || sku.length == 0) {
    return res.redirect("/admin/variant-index");
  }

  const ext = await Extras.findAll({
    where: { restaurantId: restaurantId },
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
    where: { restaurantId: restaurantId },
  });

  const cat = await Category.findAll({
    where: { restaurantId: restaurantId },
    include: [
      {
        model: CategoryTranslation,
      },
    ],
  });
  try {
    // Variáns létrehozása
    async function createVariant() {
      const variant = await Variant.create({
        sku: sku,
        restaurantId: restaurantId,
        categoryId: categoryId,
        maxOption: maxOption,
      });
      variantId = variant.id;
    }

    // Az összes termékhez hozzáadom a létrehozott variánst
    async function createVariantToProductFinal() {
      for (let i = 0; i < productId.length; i++) {
        await ProductsFinal.create({
          price: 0,
          active: 0,
          productId: productId[i].id,
          variantId: variantId,
        });
      }
    }
  } catch (err) {
    const error = new Error(err);
    error.httpStatusCode = 500;
    return next(error);
  }

  await VariantPropertyValue.create({
    variantId: variant.id,
    propertyValueId: propertyValueId,
    propertyId: propertyId,
  });

  await productVariantTranslation()
    .then((result) => {
      res.redirect("/admin/variant-index"),
        {
          ext: ext,
          cat: cat,
        };
    })
    .catch((err) => {
      // const error = new Error(err);
      // error.httpStatusCode = 500;
      // return next(error);
    });
};

exports.getEditVariant = async (req, res, next) => {
  const editMode = req.query.edit;
  const varId = req.params.variantId;
  await Variant.findByPk(varId).then((variant) => {
    if (!variant || !editMode) {
      return res.redirect("/");
    }
  });

  let languageCode;

  if (req.cookies.language == "ro") {
    languageCode = 1;
  } else if (req.cookies.language == "hu") {
    languageCode = 2;
  } else {
    languageCode = 3;
  }

  const propertyValTransId = await VariantPropertyValue.findAll({
    where: { variantId: varId },
    include: [
      {
        model: PropertyValue,
      },
    ],
  });

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
        testActiveOk: propertyValTransId[0].propertyValueId,
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
  console.log(req.body);
  const extId = req.body.extraId;
  const updatedSku = req.body.sku;
  const varId = req.body.variantId;
  const filteredStatus = req.body.status.filter(Boolean);
  const filteredOptions = req.body.statusOption.filter(Boolean);
  const maxOption = req.body.maxOption;
  const categoryId = req.body.categoryId;
  const Op = Sequelize.Op;
  const dasd = req.body.varId;
  let variantId = [dasd];

  try {
    if (extId.length == 0 || updatedSku.length == 0) {
      return res.redirect("/admin/variant-index");
    }
    const productVarToExt = await ProductVariantsExtras.findAll({
      where: {
        variantId: {
          [Op.in]: variantId,
        },
      },
      include: [{ model: Extra }],
    });

    await VariantPropertyValue.update(
      {
        propertyValueId: req.body.propertyValueId,
        propertyId: req.body.propertyId,
      },
      {
        where: {
          variantId: req.body.varId,
        },
      }
    );

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

    await msg();

    res.redirect("/admin/variant-index");
  } catch (error) {
    console.log(error);
    error.httpStatusCode = 500;
    return next(error);
  }

  // })
  // .catch((err) => {
  //   console.log(err);
  //   const error = new Error(err);
  //   error.httpStatusCode = 500;
  //   return next(error);
  // });
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
