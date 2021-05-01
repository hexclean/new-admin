const Property = require("../../models/Property");
const PropertyTranslation = require("../../models/PropertyTranslation");
const Product = require("../../models/Product");
const Variant = require("../../models/Variant");
const ProductTranslation = require("../../models/ProductTranslation");
const ProductFinal = require("../../models/ProductFinal");
const Sequelize = require("sequelize");
const Allergen = require("../../models/Allergen");
const ProductHasAllergen = require("../../models/ProductHasAllergen");
const ProductVariants = require("../../models/Variant");
const AllergenTranslation = require("../../models/AllergenTranslation");
const Category = require("../../models/Category");
const CategoryTranslation = require("../../models/CategoryTranslation");
const Box = require("../../models/Box");
const Extras = require("../../models/Extra");
const ExtraTranslations = require("../../models/ExtraTranslation");
const ITEMS_PER_PAGE = 30;
const { getLanguageCode } = require("../../shared/language");

// Termékek
exports.getProducts = async (req, res, next) => {
  const page = +req.query.page || 1;
  let totalItems;
  let restaurantId = req.admin.id;
  const languageCode = getLanguageCode(req.cookies.language);

  // Le kell ellenőrizni, hogy az étteremnek legalább 2 hozzárendelt variánsa van-e
  const variant = await ProductVariants.findAll({
    where: { restaurantId: restaurantId },
  });
  // Le kell ellenőrizni, hogy az étteremnek legalább 2 hozzárendelt csomagolása van-e
  const box = await Box.findAll({
    where: { restaurantId: restaurantId },
  });

  // Le kell ellenőrizni, hogy az étteremnek legalább 2 hozzárendelt allergénje van-e
  const checkAllergenLength = await Allergen.findAll({
    where: {
      restaurantId: req.admin.id,
    },
  });

  // Upsell termékek keresése
  await Product.findAll({
    where: { restaurantId: restaurantId, active: 1, upsell: 1, isDailyMenu: 0 },

    include: [
      {
        model: ProductTranslation,
        where: { languageId: languageCode },
      },
      { model: ProductFinal, where: { active: 1 } },
    ],
  })
    .then((numAllergen) => {
      totalItems = numAllergen;
      return Product.findAll({
        where: {
          restaurantId: restaurantId,
          active: 1,
          upsell: 1,
          isDailyMenu: 0,
        },
        include: [
          {
            model: ProductTranslation,
            where: { languageId: languageCode },
          },
          {
            model: ProductFinal,
            where: { active: 1 },
            include: [{ model: Variant }],
          },
        ],
        offset: (page - 1) * ITEMS_PER_PAGE,
        limit: ITEMS_PER_PAGE,
      });
    })
    .then((product) => {
      res.render("lists/products", {
        pageTitle: "Admin Products",
        path: "/admin/products",
        currentPage: page,
        hasNextPage: ITEMS_PER_PAGE * page < totalItems.length,
        hasPreviousPage: page > 1,
        nextPage: page + 1,
        previousPage: page - 1,
        lastPage: Math.ceil(totalItems.length / ITEMS_PER_PAGE),
        prods: product,
        variant: variant,
        box: box,
        checkAllergenLength: checkAllergenLength,
      });
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

// Napi menük
exports.getDailyMenu = async (req, res, next) => {
  const page = +req.query.page || 1;
  let totalItems;
  let restaurantId = req.admin.id;
  const languageCode = getLanguageCode(req.cookies.language);

  // Le kell ellenőrizni, hogy az étteremnek legalább 2 hozzárendelt variánsa van-e
  const variant = await ProductVariants.findAll({
    where: { restaurantId: restaurantId },
  });
  // Le kell ellenőrizni, hogy az étteremnek legalább 2 hozzárendelt csomagolása van-e
  const box = await Box.findAll({
    where: { restaurantId: restaurantId },
  });

  // Le kell ellenőrizni, hogy az étteremnek legalább 2 hozzárendelt allergénje van-e
  const checkAllergenLength = await Allergen.findAll({
    where: {
      restaurantId: req.admin.id,
    },
  });
  // Upsell termékek keresése
  await Product.findAll({
    where: { restaurantId: restaurantId, active: 1, upsell: 1, isDailyMenu: 1 },

    include: [
      {
        model: ProductTranslation,
        where: { languageId: languageCode },
      },
      { model: ProductFinal, where: { active: 1 } },
    ],
  })
    .then((numAllergen) => {
      totalItems = numAllergen;
      return Product.findAll({
        where: {
          restaurantId: restaurantId,
          active: 1,
          upsell: 1,
          isDailyMenu: 1,
        },
        include: [
          {
            model: ProductTranslation,
            where: { languageId: languageCode },
          },
          {
            model: ProductFinal,
            where: { active: 1 },
            include: [{ model: Variant }],
          },
        ],
        offset: (page - 1) * ITEMS_PER_PAGE,
        limit: ITEMS_PER_PAGE,
      });
    })
    .then((product) => {
      res.render("lists/daily-menus", {
        pageTitle: "Admin Products",
        path: "/admin/products",
        currentPage: page,
        hasNextPage: ITEMS_PER_PAGE * page < totalItems.length,
        hasPreviousPage: page > 1,
        nextPage: page + 1,
        previousPage: page - 1,
        lastPage: Math.ceil(totalItems.length / ITEMS_PER_PAGE),
        prods: product,
        variant: variant,
        box: box,
        checkAllergenLength: checkAllergenLength,
      });
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

// Downsell termékek
exports.getDownsellProducts = async (req, res, next) => {
  const page = +req.query.page || 1;
  let totalItems;
  let restaurantId = req.admin.id;
  const languageCode = getLanguageCode(req.cookies.language);

  // Le kell ellenőrizni, hogy az étteremnek legalább 2 hozzárendelt variánsa van-e
  const variant = await ProductVariants.findAll({
    where: { restaurantId: restaurantId },
  });
  // Le kell ellenőrizni, hogy az étteremnek legalább 2 hozzárendelt csomagolása van-e
  const box = await Box.findAll({
    where: { restaurantId: restaurantId },
  });

  // Le kell ellenőrizni, hogy az étteremnek legalább 2 hozzárendelt allergénje van-e
  const checkAllergenLength = await Allergen.findAll({
    where: {
      restaurantId: req.admin.id,
    },
  });

  // Upsell termékek keresése
  await Product.findAll({
    where: { restaurantId: restaurantId, active: 1, upsell: 3, isDailyMenu: 0 },

    include: [
      {
        model: ProductTranslation,
        where: { languageId: languageCode },
      },
      { model: ProductFinal, where: { active: 1 } },
    ],
  })
    .then((numAllergen) => {
      totalItems = numAllergen;
      return Product.findAll({
        where: {
          restaurantId: restaurantId,
          active: 1,
          upsell: 3,
          isDailyMenu: 0,
        },
        include: [
          {
            model: ProductTranslation,
            where: { languageId: languageCode },
          },
          {
            model: ProductFinal,
            where: { active: 1 },
            include: [{ model: Variant }],
          },
        ],
        offset: (page - 1) * ITEMS_PER_PAGE,
        limit: ITEMS_PER_PAGE,
      });
    })
    .then((product) => {
      res.render("lists/downsells", {
        pageTitle: "Admin Products",
        path: "/admin/products",
        currentPage: page,
        hasNextPage: ITEMS_PER_PAGE * page < totalItems.length,
        hasPreviousPage: page > 1,
        nextPage: page + 1,
        previousPage: page - 1,
        lastPage: Math.ceil(totalItems.length / ITEMS_PER_PAGE),
        prods: product,
        variant: variant,
        box: box,
        checkAllergenLength: checkAllergenLength,
      });
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

// Downsell termékek
exports.getUpsellProducts = async (req, res, next) => {
  const page = +req.query.page || 1;
  const languageCode = getLanguageCode(req.cookies.language);
  let totalItems;
  let restaurantId = req.admin.id;

  // Le kell ellenőrizni, hogy az étteremnek legalább 2 hozzárendelt variánsa van-e
  const variant = await ProductVariants.findAll({
    where: { restaurantId: restaurantId },
  });

  // Le kell ellenőrizni, hogy az étteremnek legalább 2 hozzárendelt csomagolása van-e
  const box = await Box.findAll({
    where: { restaurantId: restaurantId },
  });

  // Le kell ellenőrizni, hogy az étteremnek legalább 2 hozzárendelt allergénje van-e
  const checkAllergenLength = await Allergen.findAll({
    where: {
      restaurantId: req.admin.id,
    },
  });

  // Upsell termékek keresése
  await Product.findAll({
    where: { restaurantId: restaurantId, active: 1, upsell: 2, isDailyMenu: 0 },

    include: [
      {
        model: ProductTranslation,
        where: { languageId: languageCode },
      },
      { model: ProductFinal, where: { active: 1 } },
    ],
  })
    .then((numAllergen) => {
      totalItems = numAllergen;
      return Product.findAll({
        where: {
          restaurantId: restaurantId,
          active: 1,
          upsell: 2,
          isDailyMenu: 0,
        },
        include: [
          {
            model: ProductTranslation,
            where: { languageId: languageCode },
          },
          {
            model: ProductFinal,
            where: { active: 1 },
            include: [{ model: Variant }],
          },
        ],
        offset: (page - 1) * ITEMS_PER_PAGE,
        limit: ITEMS_PER_PAGE,
      });
    })
    .then((product) => {
      res.render("lists/upsells", {
        pageTitle: "Admin Products",
        path: "/admin/products",
        currentPage: page,
        hasNextPage: ITEMS_PER_PAGE * page < totalItems.length,
        hasPreviousPage: page > 1,
        nextPage: page + 1,
        previousPage: page - 1,
        lastPage: Math.ceil(totalItems.length / ITEMS_PER_PAGE),
        prods: product,
        variant: variant,
        box: box,
        checkAllergenLength: checkAllergenLength,
      });
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

// Törölt termékek
exports.getDeletedProducts = async (req, res, next) => {
  const page = +req.query.page || 1;
  let totalItems;
  let languageCode;
  let restaurantId = req.admin.id;

  if (req.cookies.language == "ro") {
    languageCode = 1;
  } else if (req.cookies.language == "hu") {
    languageCode = 2;
  } else {
    languageCode = 3;
  }

  // Upsell termékek keresése
  await Product.findAll({
    where: { restaurantId: restaurantId, active: 0, soldOut: 1 },

    include: [
      {
        model: ProductTranslation,
        where: { languageId: languageCode },
      },
      { model: ProductFinal, where: { active: 1 } },
    ],
  })
    .then((numAllergen) => {
      totalItems = numAllergen;
      return Product.findAll({
        where: {
          restaurantId: restaurantId,
          active: 0,
          soldOut: 1,
        },
        include: [
          {
            model: ProductTranslation,
            where: { languageId: languageCode },
          },
          {
            model: ProductFinal,
            where: { active: 1 },
            include: [{ model: Variant }],
          },
        ],
        offset: (page - 1) * ITEMS_PER_PAGE,
        limit: ITEMS_PER_PAGE,
      });
    })
    .then((product) => {
      res.render("lists/deleted-products", {
        pageTitle: "Admin Products",
        path: "/admin/products",
        currentPage: page,
        hasNextPage: ITEMS_PER_PAGE * page < totalItems.length,
        hasPreviousPage: page > 1,
        nextPage: page + 1,
        previousPage: page - 1,
        lastPage: Math.ceil(totalItems.length / ITEMS_PER_PAGE),
        prods: product,
      });
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getSubcategories = async (req, res, next) => {
  let languageCode;
  let restaurantId = req.admin.id;
  if (req.cookies.language == "ro") {
    languageCode = 1;
  } else if (req.cookies.language == "hu") {
    languageCode = 2;
  } else {
    languageCode = 3;
  }

  const page = +req.query.page || 1;
  let totalItems;

  await Property.findAll({
    where: {
      restaurantId: restaurantId,
    },
    include: [
      {
        model: PropertyTranslation,
        where: { languageId: languageCode },
      },
    ],
  })
    .then((numExtra) => {
      totalItems = numExtra;
      return Property.findAll({
        where: {
          restaurantId: restaurantId,
        },
        include: [
          {
            model: PropertyTranslation,
            where: { languageId: languageCode },
          },
        ],

        offset: (page - 1) * ITEMS_PER_PAGE,
        limit: ITEMS_PER_PAGE,
      });
    })
    .then((property) => {
      res.render("lists/subcategories", {
        pageTitle: "Admin Products",
        path: "/admin/products",
        currentPage: page,

        hasNextPage: ITEMS_PER_PAGE * page < totalItems.length,
        hasPreviousPage: page > 1,
        nextPage: page + 1,
        previousPage: page - 1,
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

// Kategóriák
exports.getCategoryIndex = async (req, res, next) => {
  const page = +req.query.page || 1;
  let totalItems;
  let restaurantId = req.admin.id;
  const languageCode = getLanguageCode(req.cookies.language);

  const property = await Property.findAll({
    where: { restaurantId: restaurantId },
  });

  await Category.findAll({
    where: {
      restaurantId: restaurantId,
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
          restaurantId: restaurantId,
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
      res.render("lists/categories", {
        pageTitle: "Admin Products",
        path: "/admin/products",
        currentPage: page,
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

// Variánsok
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
      res.render("lists/variants", {
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

//Extrák
exports.getExtraIndex = async (req, res, next) => {
  // await AdminLogs.create({
  //   restaurant_id: req.admin.id,
  //   operation_type: "GET",
  //   description: "Opened list of all extra",
  //   route: "getBoxIndex",
  // });
  const languageCode = getLanguageCode(req.cookies.language);

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
      res.render("lists/extras", {
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

// Csomagolások
exports.getBoxIndex = async (req, res, next) => {
  const page = +req.query.page || 1;
  let totalItems;

  // await AdminLogs.create({
  //   restaurant_id: req.admin.id,
  //   operation_type: "GET",
  //   description: "Opened list of all boxes",
  //   route: "getBoxIndex",
  // });
  await Box.findAll({
    where: {
      restaurantId: req.admin.id,
    },
  })
    .then((numBox) => {
      totalItems = numBox;
      return Box.findAll({
        where: {
          restaurantId: req.admin.id,
        },

        offset: (page - 1) * ITEMS_PER_PAGE,
        limit: ITEMS_PER_PAGE,
      });
    })
    .then((box) => {
      res.render("lists/boxes", {
        pageTitle: "Admin Products",
        path: "/admin/products",
        currentPage: page,
        hasNextPage: ITEMS_PER_PAGE * page < totalItems.length,
        hasPreviousPage: page > 1,
        nextPage: page + 1,
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

// Allergének
exports.getAllergenIndex = async (req, res, next) => {
  const page = +req.query.page || 1;
  let totalItems;

  const languageCode = getLanguageCode(req.cookies.language);

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
      res.render("lists/allergens", {
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
