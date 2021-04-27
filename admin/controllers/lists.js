const fileHelper = require("../../util/file");
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
const ITEMS_PER_PAGE = 30;

exports.getUpsellProducts = async (req, res, next) => {
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

  // Le kell ellenőrizni, hogy az étteremnek legalább 2 hozzárendelt variánsa van-e
  const variant = await ProductVariants.findAll({
    where: { restaurantId: restaurantId },
  });
  // Le kell ellenőrizni, hogy az étteremnek legalább 2 hozzárendelt csomagolása van-e
  const box = await Box.findAll({
    where: { restaurantId: restaurantId },
  });

  // Upsell termékek keresése
  await Product.findAll({
    where: { restaurantId: restaurantId, active: 1, upsell: 2 },

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
      res.render("lists/upsell", {
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
      });
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getDownsellProducts = async (req, res, next) => {
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

  // Le kell ellenőrizni, hogy az étteremnek legalább 2 hozzárendelt variánsa van-e
  const variant = await ProductVariants.findAll({
    where: { restaurantId: restaurantId },
  });
  // Le kell ellenőrizni, hogy az étteremnek legalább 2 hozzárendelt csomagolása van-e
  const box = await Box.findAll({
    where: { restaurantId: restaurantId },
  });

  // Upsell termékek keresése
  await Product.findAll({
    where: { restaurantId: restaurantId, active: 1, upsell: 3 },

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
      res.render("lists/downsell", {
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
      });
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};
