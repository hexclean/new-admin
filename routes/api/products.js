const express = require("express");
const router = express.Router();
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const sequelize = require("../../util/database");
const RestaurantFilters = require("../../models/RestaurantFilters");
const LocationNameTransalation = require("../../models/LocationNameTranslation");
const AllergenTranslation = require("../../models/AllergenTranslation");
const Restaurant = require("../../models/Restaurant");
const RestaurantDescription = require("../../models/AdminInfo");
const Allergen = require("../../models/Allergen");
const ProductHasAllergen = require("../../models/ProductHasAllergen");
const Products = require("../../models/Product");
const { localsName } = require("ejs");

router.post("/", async (req, res) => {
  const restaurantName = req.body.restaurantName;
  const lang = req.body.lang;
  const searchedProduct = req.body.searchedProduct;

  let languageCode;
  if (lang == "ro") {
    languageCode = 1;
  } else if (lang == "hu") {
    languageCode = 2;
  } else if (lang == "en") {
    languageCode = 3;
  } else {
    res.json({
      status: 404,
      msg: "Language not found",
      result: [],
    });
  }

  return sequelize
    .query(
      `SELECT adm.imageUrl as restaurant_ProfileImg,adm.coverUrl as restaurant_coverImg, adm.rating AS restaurant_rating, prodFin.variantId as variantId, catTrans.name as categoryName, adm.fullName as partnerName, prod.id as productId, prod.imageUrl as productImageUrl,
      prodTrans.title as productTitle, prodTrans.description productDescription, prodFin.price as productPrice,prodFin.discountedPrice as productDiscountedPrice
      FROM productFinals as prodFin 
      INNER JOIN products as prod ON prodFin.productId = prod.id
      INNER JOIN restaurants as adm
      On prod.restaurantId = adm.id 
      INNER JOIN productTranslations as prodTrans ON prodTrans.productId = prod.id 
      INNER JOIN productVariants as var ON prodFin.variantId = var.id
      INNER JOIN productCategories as cat
      on var.categoryId = cat.id
      inner join productCategoryTranslations as catTrans ON catTrans.productCategoryId = cat.id
      WHERE catTrans.languageId =${languageCode}  and prodFin.active=1 and adm.fullName LIKE '%${restaurantName}%' AND
      prodTrans.languageId =${languageCode} and prodTrans.title LIKE "%${searchedProduct}%"
       `,
      { type: Sequelize.QueryTypes.SELECT }
    )
    .then((resultsList) => {
      const items = [];
      for (let d of resultsList) {
        const item = {
          variantId: d.variantId,
          categoryName: d.categoryName,
          partnerName: d.partnerName,
          productId: d.productId,
          productImageUrl: d.productImageUrl,
          productTitle: d.productTitle,
          productDescription: d.productDescription,
          productPrice: d.productPrice,
          productDiscountedPrice: d.productDiscountedPrice,
          restaurant_ProfileImg: d.restaurant_ProfileImg,
          restaurant_coverImg: d.restaurant_coverImg,
          restaurant_rating: d.restaurant_rating,
        };
        items.push(item);
      }
      const result = items.reduce((accumulator, currentValue) => {
        const { categoryName } = currentValue;
        const key = categoryName;
        accumulator[key] = accumulator[key] || [];
        console.log("accumulator[key]", key);
        accumulator[key].push(currentValue);
        sequelize.query(
          `SELECT adm.imageUrl as restaurant_ProfileImg,adm.coverUrl as restaurant_coverImg, adm.rating AS restaurant_rating, prodFin.variantId as variantId, catTrans.name as categoryName, adm.fullName as partnerName, prod.id as productId, prod.imageUrl as productImageUrl,
      prodTrans.title as productTitle, prodTrans.description productDescription, prodFin.price as productPrice,prodFin.discountedPrice as productDiscountedPrice
      FROM productFinals as prodFin 
      INNER JOIN products as prod ON prodFin.productId = prod.id
      INNER JOIN restaurants as adm
      On prod.restaurantId = adm.id 
      INNER JOIN productTranslations as prodTrans ON prodTrans.productId = prod.id 
      INNER JOIN productVariants as var ON prodFin.variantId = var.id
      INNER JOIN productCategories as cat
      on var.categoryId = cat.id
      inner join productCategoryTranslations as catTrans ON catTrans.productCategoryId = cat.id 
      WHERE catTrans.languageId =${languageCode}  and prodFin.active=1 and adm.fullName LIKE '%${restaurantName}%' AND
      prodTrans.languageId =${languageCode}
       `,
          { type: Sequelize.QueryTypes.SELECT }
        );
        return accumulator;
      }, Object.create(null));

      res.json({
        status: 200,
        msg: "Products list successfully listed",
        result,
      });
    });
});

router.post("/allergen", async (req, res) => {
  const restaurantName = req.body.restaurantName;
  const lang = req.body.lang;
  const productId = req.body.productId;
  let languageCode;
  if (lang == "ro") {
    languageCode = 1;
  } else if (lang == "hu") {
    languageCode = 2;
  } else if (lang == "en") {
    languageCode = 3;
  } else {
    res.json({
      status: 404,
      msg: "Language not found",
      result: [],
    });
  }

  return sequelize
    .query(
      `SELECT prod.id as product_id,al.id as allergen_id, alTrans.name as allergen_name
      from products as prod
      inner join restaurants as res
      on res.id = prod.restaurantId
      inner join productHasAllergens as prodHas
      on prodHas.productId = prod.id
      inner join allergens as al on al.id = prodHas.allergenId inner join allergenTranslations as alTrans on alTrans.allergenId = al.id
      WHERE prod.id =${productId} AND prodHas.productId = ${productId}
      AND alTrans.languageId =${languageCode} AND prodHas.active =1 AND res.fullName LIKE "%${restaurantName}%"
       `,
      { type: Sequelize.QueryTypes.SELECT }
    )
    .then((result) => {
      if (result.length == 0) {
        return res.json({
          status: 404,
          msg: "Allergen not found",
          result: [],
        });
      }
      res.json({
        status: 200,
        msg: "Product allergen successfully listed",
        result,
      });
    });
});

router.post("/category", async (req, res) => {
  var categoryId = req.body.categoryId;

  if (categoryId.length > 0) {
    if (isNaN(categoryId)) {
      return res.json({
        status: 400,
        msg: "Something went wrong",
        result: [],
      });
    }
  }

  const restaurantName = req.body.restaurantName;
  const lang = req.body.lang;
  let languageCode;

  if (lang == "ro") {
    languageCode = 1;
  } else if (lang == "hu") {
    languageCode = 2;
  } else if (lang == "en") {
    languageCode = 3;
  } else {
    return res.json({
      status: 404,
      msg: "Language not found",
      result: [],
    });
  }

  const searchedProduct = req.body.searchedProduct;
  const result = await sequelize.query(
    `SELECT prod.id as productId, prod.imageUrl as productImageUrl, prodTrans.title as productTitle,
        prodTrans.description as productDescription, prodFin.price as productPrice, prodFin.discountedPrice as productDiscountedPrice, catTrans.name as category_name,
        res.fullName as partnerName
                FROM productFinals as prodFin
                inner join products as prod
                on prod.id = prodFin.productId
                inner join productTranslations as prodTrans
                on prodTrans.productId = prod.id
                inner JOIN productVariants as prodVar
                on prodVar.id = prodFin.variantId
                inner join productCategories as cat
                on cat.id = prodVar.categoryId
                inner join productCategoryTranslations as catTrans
                on catTrans.productCategoryId = cat.id
                inner join restaurants as res
                on res.id = prodVar.restaurantId
                WHERE catTrans.languageId =${languageCode} and prodFin.active =1 and prodTrans.languageId=${languageCode}
                and cat.id = ${categoryId} AND prodTrans.title lIKE "%${searchedProduct}%" AND res.fullName LIKE "%${restaurantName}%";
       `,
    { type: Sequelize.QueryTypes.SELECT }
  );
  const items = [];
  for (let d of result) {
    const item = {
      category_name: d.category_name,
    };
    items.push(item);
  }
  let newIt = [];
  for (let i = 0; i < 1; i++) {
    newIt.push(items[0]);
  }
  if (result.length == 0) {
    return res.json({
      status: 200,
      msg: "Product not found in this category name",
      result: [],
    });
  }
  let category_name = newIt[0].category_name;
  return res.json({
    status: 200,
    msg: "Product list successfully listed",
    result: [
      {
        category_name,
        product_list: result,
      },
    ],
  });
});

module.exports = router;
