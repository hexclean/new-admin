const ProductVariants = require("../../models/Variant");
const Property = require("../../models/Property");
const PropertyTranslation = require("../../models/PropertyTranslation");
const Category = require("../../models/Category");
const CategoryTranslation = require("../../models/CategoryTranslation");
const Extras = require("../../models/Extra");
const ExtraTranslations = require("../../models/ExtraTranslation");
const Sequelize = require("sequelize");
const Allergen = require("../../models/Allergen");
const AllergenTranslation = require("../../models/AllergenTranslation");
const Box = require("../../models/Box");
const BoxTranslation = require("../../models/BoxTranslation");
const ITEMS_PER_PAGE = 30;
const Op = Sequelize.Op;
const AdminLogs = require("../../models/AdminLogs");

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
  await AdminLogs.create({
    restaurant_id: req.admin.id,
    operation_type: "GET",
    description: "Opened list of all extra",
    route: "getBoxIndex",
  });
  let languageCode;

  if (req.cookies.language == "ro") {
    languageCode = 1;
  } else if (req.cookies.language == "hu") {
    languageCode = 2;
  } else {
    languageCode = 3;
  }

  const page = +req.query.page || 1;
  let totalItems;

  const checkAllergenLength = await Allergen.findAll({
    where: {
      restaurantId: req.admin.id,
    },
  });

  await Extras.findAll({
    where: {
      restaurantId: req.admin.id,
    },
    include: [
      {
        model: ExtraTranslations,
        where: { languageId: languageCode },
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
            where: { languageId: languageCode },
          },
        ],

        offset: (page - 1) * ITEMS_PER_PAGE,
        limit: ITEMS_PER_PAGE,
      });
    })
    .then((extra) => {
      res.render("combo/extra-index", {
        pageTitle: "Admin Products",
        path: "/admin/products",
        currentPage: page,
        checkAllergenLength: checkAllergenLength,
        hasNextPage: ITEMS_PER_PAGE * page < totalItems.length,
        hasPreviousPage: page > 1,
        nextPage: page + 1,
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
  let languageCode;

  if (req.cookies.language == "ro") {
    languageCode = 1;
  } else if (req.cookies.language == "hu") {
    languageCode = 2;
  } else {
    languageCode = 3;
  }
  const checkAllergenLength = await Allergen.findAll({
    where: {
      restaurantId: req.admin.id,
    },
  });

  const property = await Property.findAll({
    where: { restaurantId: req.admin.id },
  });
  console.log(property.length);
  await Category.findAll({
    where: {
      restaurantId: req.admin.id,
    },
    include: [
      {
        model: CategoryTranslation,
        where: { languageId: languageCode },
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
            where: { languageId: languageCode },
          },
        ],

        offset: (page - 1) * ITEMS_PER_PAGE,
        limit: ITEMS_PER_PAGE,
      });
    })
    .then((category) => {
      res.render("combo/category-index", {
        pageTitle: "Admin Products",
        path: "/admin/products",
        currentPage: page,
        checkAllergenLength: checkAllergenLength,
        hasNextPage: ITEMS_PER_PAGE * page < totalItems.length,
        hasPreviousPage: page > 1,
        nextPage: page + 1,
        property: property,
        previousPage: page - 1,
        lastPage: Math.ceil(totalItems.length / ITEMS_PER_PAGE),
        category: category,
      });
    })
    .catch((err) => {
      console.log(err);
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getAllergenIndex = async (req, res, next) => {
  const page = +req.query.page || 1;
  let totalItems;

  let languageCode;

  if (req.cookies.language == "ro") {
    languageCode = 1;
  } else if (req.cookies.language == "hu") {
    languageCode = 2;
  } else {
    languageCode = 3;
  }
  await Allergen.findAll({
    where: {
      restaurantId: req.admin.id,
    },
    include: [
      {
        model: AllergenTranslation,
        where: { languageId: languageCode },
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
            where: { languageId: languageCode },
          },
        ],

        offset: (page - 1) * ITEMS_PER_PAGE,
        limit: ITEMS_PER_PAGE,
      });
    })
    .then((allergen) => {
      res.render("combo/allergen-index", {
        pageTitle: "Admin Products",
        path: "/admin/products",
        currentPage: page,
        hasNextPage: ITEMS_PER_PAGE * page < totalItems.length,
        hasPreviousPage: page > 1,
        nextPage: page + 1,
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
  await AdminLogs.create({
    restaurant_id: req.admin.id,
    operation_type: "GET",
    description: "Opened list of all boxes",
    route: "getBoxIndex",
  });
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
          currentBoxName[i] = box[i].BoxTranslations[0].name;
        } else if (currentLanguage == "hu") {
          currentBoxName[i] = box[i].BoxTranslations[1].name;
        } else {
          currentBoxName[i] = box[i].BoxTranslations[2].name;
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
        extras: allergen,
      });
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getPropertyIndex = async (req, res, next) => {
  // await AdminLogs.create({
  //   restaurant_id: req.admin.id,
  //   operation_type: "GET",
  //   description: "Opened list of all extra",
  //   route: "getBoxIndex",
  // });

  const page = +req.query.page || 1;
  let totalItems;
  let currentPropertyName = [];

  await Property.findAll({
    where: {
      restaurantId: req.admin.id,
    },
    include: [
      {
        model: PropertyTranslation,
      },
    ],
  })
    .then((numExtra) => {
      totalItems = numExtra;
      return Property.findAll({
        where: {
          restaurantId: req.admin.id,
        },
        include: [
          {
            model: PropertyTranslation,
          },
        ],

        offset: (page - 1) * ITEMS_PER_PAGE,
        limit: ITEMS_PER_PAGE,
      });
    })
    .then((property) => {
      for (let i = 0; i < property.length; i++) {
        var currentLanguage = req.cookies.language;

        if (currentLanguage == "ro") {
          currentPropertyName[i] = property[i].PropertyTranslations[0].name;
        } else if (currentLanguage == "hu") {
          currentPropertyName[i] = property[i].PropertyTranslations[1].name;
        } else {
          currentPropertyName[i] = property[i].PropertyTranslations[2].name;
        }
      }

      res.render("combo/property-index", {
        pageTitle: "Admin Products",
        path: "/admin/products",
        currentPage: page,

        hasNextPage: ITEMS_PER_PAGE * page < totalItems.length,
        hasPreviousPage: page > 1,
        nextPage: page + 1,
        previousPage: page - 1,
        currentPropertyName: currentPropertyName,
        lastPage: Math.ceil(totalItems.length / ITEMS_PER_PAGE),
        property: property,
      });
    })
    .catch((err) => {
      console.log(err);
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};
