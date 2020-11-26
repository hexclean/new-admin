const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const ProductVariants = require("../../models/ProductVariant");
const Category = require("../../models/Category");
const CategoryTranslation = require("../../models/CategoryTranslation");
const Extras = require("../../models/Extra");
const ExtraTranslations = require("../../models/ExtraTranslation");
const Allergen = require("../../models/Allergen");
const AllergenTranslation = require("../../models/AllergenTranslation");
const Box = require("../../models/Box");
const BoxTranslation = require("../../models/BoxTranslation");
const ITEMS_PER_PAGE = 10;

exports.getFilteredExtra = async (req, res, next) => {
  var categoryName = req.params.extraId;
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

  await Extras.findAll({
    where: {
      restaurantId: req.admin.id,
    },
    include: [
      {
        model: ExtraTranslations,
        where: {
          name: { [Op.like]: "%" + categoryName + "%" },
          languageId: currentCategoryName,
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
  var currentBoxName;
  var currentLanguage = req.cookies.language;

  if (boxName.length == 1) {
    boxName = [];
  }

  if (currentLanguage == "ro") {
    currentBoxName = 1;
  } else if (currentLanguage == "hu") {
    currentBoxName = 2;
  } else {
    currentBoxName = 3;
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
          languageId: currentBoxName,
        },
      },
    ],
  })

    .then((box) => {
      // console.log(box);
      console.log("currentBoxName-----", currentBoxName);
      res.render("live-search/search-box", {
        box: box,
        currentLanguage: currentBoxName,
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
