const ProductVariants = require("../../models/ProductVariant");
const Category = require("../../models/ProductCategory");
const CategoryTranslation = require("../../models/ProductCategoryTranslation");
const Extras = require("../../models/Extra");
const ExtraTranslations = require("../../models/ExtraTranslation");
const Sequelize = require("sequelize");
const Allergen = require("../../models/Allergen");
const AllergenTranslation = require("../../models/AllergenTranslation");
const Box = require("../../models/Box");
const BoxTranslation = require("../../models/BoxTranslation");
const ITEMS_PER_PAGE = 10;
const Op = Sequelize.Op;

exports.getVariantIndex = async (req, res, next) => {
  const page = +req.query.page || 1;
  let totalItems;

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

  await ProductVariants.findAll({
    where: {
      restaurantId: req.admin.id,
    },
  })
    .then((numVariants) => {
      totalItems = numVariants;
      return ProductVariants.findAll({
        where: {
          restaurantId: req.admin.id,
        },

        offset: (page - 1) * ITEMS_PER_PAGE,
        limit: ITEMS_PER_PAGE,
      });
    })
    .then((vr) => {
      res.render("combo/variant-index", {
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
      });
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getExtraIndex = async (req, res, next) => {
  const page = +req.query.page || 1;
  let totalItems;
  let currentExtraName = [];

  const checkAllergenLength = await Allergen.findAll({
    where: {
      restaurantId: req.admin.id,
    },
  });

  const checkCategoryLength = await Category.findAll({
    where: { restaurantId: req.admin.id },
  });

  await Extras.findAll({
    where: {
      restaurantId: req.admin.id,
    },
    include: [
      {
        model: ExtraTranslations,
      },
    ],
  })
    .then((numExtra) => {
      totalItems = numExtra;
      return Extras.findAll({
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
    })
    .then((extra) => {
      for (let i = 0; i < extra.length; i++) {
        var currentLanguage = req.cookies.language;

        if (currentLanguage == "ro") {
          currentExtraName[i] = extra[i].extraTranslations[0].name;
        } else if (currentLanguage == "hu") {
          currentExtraName[i] = extra[i].extraTranslations[1].name;
        } else {
          currentExtraName[i] = extra[i].extraTranslations[2].name;
        }
      }

      res.render("combo/extra-index", {
        pageTitle: "Admin Products",
        path: "/admin/products",
        currentPage: page,
        checkAllergenLength: checkAllergenLength,
        checkCategoryLength: checkCategoryLength,
        hasNextPage: ITEMS_PER_PAGE * page < totalItems.length,
        hasPreviousPage: page > 1,
        nextPage: page + 1,
        currentExtraName: currentExtraName,
        previousPage: page - 1,
        lastPage: Math.ceil(totalItems.length / ITEMS_PER_PAGE),
        extra: extra,
      });
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getCategoryIndex = async (req, res, next) => {
  const page = +req.query.page || 1;
  let totalItems;
  let currentCategoryName = [];

  const checkAllergenLength = await Allergen.findAll({
    where: {
      restaurantId: req.admin.id,
    },
  });

  await Category.findAll({
    where: {
      restaurantId: req.admin.id,
    },
    include: [
      {
        model: CategoryTranslation,
      },
    ],
  })
    .then((numCategory) => {
      totalItems = numCategory;
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
    })
    .then((category) => {
      for (let i = 0; i < category.length; i++) {
        var currentLanguage = req.cookies.language;

        if (currentLanguage == "ro") {
          currentCategoryName[i] =
            category[i].productCategoryTranslations[0].name;
        } else if (currentLanguage == "hu") {
          currentCategoryName[i] =
            category[i].productCategoryTranslations[1].name;
        } else {
          currentCategoryName[i] =
            category[i].productCategoryTranslations[2].name;
        }
      }

      res.render("combo/category-index", {
        pageTitle: "Admin Products",
        path: "/admin/products",
        currentPage: page,
        checkAllergenLength: checkAllergenLength,
        hasNextPage: ITEMS_PER_PAGE * page < totalItems.length,
        hasPreviousPage: page > 1,
        nextPage: page + 1,
        currentCategoryName: currentCategoryName,
        previousPage: page - 1,
        lastPage: Math.ceil(totalItems.length / ITEMS_PER_PAGE),
        category: category,
      });
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getAllergenIndex = async (req, res, next) => {
  const page = +req.query.page || 1;
  let totalItems;
  let currentAllergenName = [];

  await Allergen.findAll({
    where: {
      restaurantId: req.admin.id,
    },
    include: [
      {
        model: AllergenTranslation,
      },
    ],
  })
    .then((numAllergen) => {
      totalItems = numAllergen;
      return Allergen.findAll({
        where: {
          restaurantId: req.admin.id,
        },
        include: [
          {
            model: AllergenTranslation,
          },
        ],

        offset: (page - 1) * ITEMS_PER_PAGE,
        limit: ITEMS_PER_PAGE,
      });
    })
    .then((allergen) => {
      for (let i = 0; i < allergen.length; i++) {
        var currentLanguage = req.cookies.language;

        if (currentLanguage == "ro") {
          currentAllergenName[i] = allergen[i].allergenTranslations[0].name;
        } else if (currentLanguage == "hu") {
          currentAllergenName[i] = allergen[i].allergenTranslations[1].name;
        } else {
          currentAllergenName[i] = allergen[i].allergenTranslations[2].name;
        }
      }

      res.render("combo/allergen-index", {
        pageTitle: "Admin Products",
        path: "/admin/products",
        currentPage: page,
        hasNextPage: ITEMS_PER_PAGE * page < totalItems.length,
        hasPreviousPage: page > 1,
        nextPage: page + 1,
        currentAllergenName: currentAllergenName,
        previousPage: page - 1,
        lastPage: Math.ceil(totalItems.length / ITEMS_PER_PAGE),
        allergen: allergen,
      });
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getBoxIndex = async (req, res, next) => {
  const page = +req.query.page || 1;
  let totalItems;
  let currentBoxName = [];

  await Box.findAll({
    where: {
      restaurantId: req.admin.id,
    },
    include: [
      {
        model: BoxTranslation,
      },
    ],
  })
    .then((numBox) => {
      totalItems = numBox;
      return Box.findAll({
        where: {
          restaurantId: req.admin.id,
        },
        include: [
          {
            model: BoxTranslation,
          },
        ],

        offset: (page - 1) * ITEMS_PER_PAGE,
        limit: ITEMS_PER_PAGE,
      });
    })
    .then((box) => {
      for (let i = 0; i < box.length; i++) {
        var currentLanguage = req.cookies.language;

        if (currentLanguage == "ro") {
          currentBoxName[i] = box[i].boxTranslations[0].name;
        } else if (currentLanguage == "hu") {
          currentBoxName[i] = box[i].boxTranslations[1].name;
        } else {
          currentBoxName[i] = box[i].allergenTranslations[2].name;
        }
      }

      res.render("combo/box-index", {
        pageTitle: "Admin Products",
        path: "/admin/products",
        currentPage: page,
        hasNextPage: ITEMS_PER_PAGE * page < totalItems.length,
        hasPreviousPage: page > 1,
        nextPage: page + 1,
        currentBoxName: currentBoxName,
        previousPage: page - 1,
        lastPage: Math.ceil(totalItems.length / ITEMS_PER_PAGE),
        box: box,
      });
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getFilteredExtra = async (req, res, next) => {
  var extraName = req.params.extraName;
  var currentExtraName;
  var currentLanguage = req.cookies.language;

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

    .then((ext) => {
      res.render("variant/searchedExtra", {
        ext: ext,
        editing: false,
        currentExtraName: extraName,
      });
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getFilteredExtraIndex = async (req, res, next) => {
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
      res.render("variant/searchedExtraIndex", {
        extra: extra,
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
      res.render("variant/searchedCategory", {
        category: category,
        editing: false,
        extras: category,
      });
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};
