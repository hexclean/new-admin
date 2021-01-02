const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const ProductVariants = require("../../models/Variant");
const Category = require("../../models/Category");
const CategoryTranslation = require("../../models/CategoryTranslation");
const Extras = require("../../models/Extra");
const ExtraTranslations = require("../../models/ExtraTranslation");
const Allergen = require("../../models/Allergen");
const AllergenTranslation = require("../../models/AllergenTranslation");
const Box = require("../../models/Box");
const BoxTranslation = require("../../models/BoxTranslation");
const Products = require("../../models/Product");
const ProductTranslation = require("../../models/ProductTranslation");
const Property = require("../../models/Property");
const PropertyValueTranslation = require("../../models/PropertyValueTranslation");
const PropertyTranslation = require("../../models/PropertyTranslation");
const ProductFinal = require("../../models/ProductFinal");
const Variant = require("../../models/Variant");

exports.getFilteredExtra = async (req, res, next) => {
  var categoryName = req.params.extraId;
  let languageCode;

  if (req.cookies.language == "ro") {
    languageCode = 1;
  } else if (req.cookies.language == "hu") {
    languageCode = 2;
  } else {
    languageCode = 3;
  }

  if (categoryName.length == 1) {
    categoryName = [];
  }

  await Extras.findAll({
    where: {
      restaurantId: req.admin.id,
    },
    include: [
      {
        model: ExtraTranslations,
        where: {
          name: { [Op.like]: "%" + categoryName + "%" },
          languageId: languageCode,
        },
      },
    ],
  })

    .then((extra) => {
      res.render("live-search/search-extra", {
        extra: extra,
        editing: false,
      });
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getFilteredCategory = async (req, res, next) => {
  var categoryName = req.params.categoryId;
  var currentCategoryName;
  var currentLanguage = req.cookies.language;

  if (categoryName.length == 1) {
    categoryName = [];
  }

  if (currentLanguage == "ro") {
    currentCategoryName = 1;
  } else if (currentLanguage == "hu") {
    currentCategoryName = 2;
  } else {
    currentCategoryName = 3;
  }

  await Category.findAll({
    where: {
      restaurantId: req.admin.id,
    },
    include: [
      {
        model: CategoryTranslation,
        where: {
          name: { [Op.like]: "%" + categoryName + "%" },
          languageId: currentCategoryName,
        },
      },
    ],
  })

    .then((category) => {
      res.render("live-search/search-category", {
        category: category,
        editing: false,
      });
    })
    .catch((err) => {
      console.log(err);
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getFilteredAllergen = async (req, res, next) => {
  var allergenName = req.params.allergenId;
  var currentAllergenName;
  var currentLanguage = req.cookies.language;

  if (allergenName.length == 1) {
    allergenName = [];
  }

  if (currentLanguage == "ro") {
    currentAllergenName = 1;
  } else if (currentLanguage == "hu") {
    currentAllergenName = 2;
  } else {
    currentAllergenName = 3;
  }

  await Allergen.findAll({
    where: {
      restaurantId: req.admin.id,
    },
    include: [
      {
        model: AllergenTranslation,
        where: {
          name: { [Op.like]: "%" + allergenName + "%" },
          languageId: currentAllergenName,
        },
      },
    ],
  })

    .then((allergen) => {
      res.render("live-search/search-allergen", {
        allergen: allergen,
        editing: false,
      });
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getFilteredBox = async (req, res, next) => {
  var boxName = req.params.boxId;
  let languageCode;

  if (req.cookies.language == "ro") {
    languageCode = 1;
  } else if (req.cookies.language == "hu") {
    languageCode = 2;
  } else {
    languageCode = 3;
  }

  if (boxName.length == 1) {
    boxName = [];
  }

  await Box.findAll({
    where: {
      restaurantId: req.admin.id,
    },
    include: [
      {
        model: BoxTranslation,
        where: {
          name: { [Op.like]: "%" + boxName + "%" },
          languageId: languageCode,
        },
      },
    ],
  })

    .then((box) => {
      res.render("live-search/search-box", {
        box: box,
        editing: false,
      });
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getFilteredVariant = async (req, res, next) => {
  var variantName = req.params.variantId;

  if (variantName.length == 1) {
    variantName = [];
  }

  await ProductVariants.findAll({
    where: {
      sku: { [Op.like]: "%" + variantName + "%" },
      restaurantId: req.admin.id,
    },
    // where: {
    //   // sku: { [Op.like]: "%" + variantName + "%" },0
    // },
  })

    .then((variant) => {
      console.log("variantName", variantName);
      console.log(variant);
      res.render("live-search/search-variant", {
        variant: variant,
        editing: false,
      });
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getFilteredOrders = async (req, res, next) => {
  var variantName = req.params.variantId;

  if (variantName.length == 1) {
    variantName = [];
  }

  await ProductVariants.findAll({
    where: {
      sku: { [Op.like]: "%" + variantName + "%" },
      restaurantId: req.admin.id,
    },
    // where: {
    //   // sku: { [Op.like]: "%" + variantName + "%" },0
    // },
  })

    .then((variant) => {
      console.log("variantName", variantName);
      console.log(variant);
      res.render("live-search/search-variant", {
        variant: variant,
        editing: false,
      });
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getFilteredProduct = async (req, res, next) => {
  var productName = req.params.productId;
  var currentProductName;
  var currentLanguage = req.cookies.language;

  if (productName.length == 1) {
    productName = [];
  }

  if (currentLanguage == "ro") {
    currentProductName = 1;
  } else if (currentLanguage == "hu") {
    currentProductName = 2;
  } else {
    currentProductName = 3;
  }

  await Products.findAll({
    where: {
      restaurantId: req.admin.id,
      active: 1,
    },
    include: [
      {
        model: ProductTranslation,
        where: {
          title: { [Op.like]: "%" + productName + "%" },
          languageId: currentProductName,
        },
      },
      {
        model: ProductFinal,
        where: { active: 1 },
        include: [{ model: Variant }],
      },
    ],
  })

    .then((prods) => {
      res.render("live-search/search-product", {
        prods: prods,
        editing: false,
      });
    })
    .catch((err) => {
      console.log(err);
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getFilteredProperty = async (req, res, next) => {
  var productName = req.params.propertyId;
  var currentPropertyName;
  var currentLanguage = req.cookies.language;

  if (productName.length == 1) {
    productName = [];
  }

  if (currentLanguage == "ro") {
    currentPropertyName = 1;
  } else if (currentLanguage == "hu") {
    currentPropertyName = 2;
  } else {
    currentPropertyName = 3;
  }

  await Property.findAll({
    where: {
      restaurantId: req.admin.id,
    },
    include: [
      {
        model: PropertyTranslation,
        where: {
          name: { [Op.like]: "%" + productName + "%" },
          languageId: currentPropertyName,
        },
      },
    ],
  })

    .then((property) => {
      res.render("live-search/search-property", {
        property: property,
        editing: false,
      });
    })
    .catch((err) => {
      console.log(err);
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getFilteredDeletedProduct = async (req, res, next) => {
  var productName = req.params.productId;
  let languageCode;

  if (req.cookies.language == "ro") {
    languageCode = 1;
  } else if (req.cookies.language == "hu") {
    languageCode = 2;
  } else {
    languageCode = 3;
  }
  if (productName.length == 1) {
    productName = [];
  }

  await Products.findAll({
    where: {
      restaurantId: req.admin.id,
      active: 0,
    },
    include: [
      {
        model: ProductTranslation,

        where: {
          title: { [Op.like]: "%" + productName + "%" },
          languageId: languageCode,
        },
      },
      {
        model: ProductFinal,
        where: { active: 1 },
        include: [{ model: Variant }],
      },
    ],
  })

    .then((prods) => {
      res.render("live-search/search-deleted-product", {
        prods: prods,
        editing: false,
      });
    })
    .catch((err) => {
      console.log(err);
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};
