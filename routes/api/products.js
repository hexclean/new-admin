const express = require("express");
const router = express.Router();
const db = require("../../server");
const Sequelize = require("sequelize");
const Categories = require("../../models/ProductCategory");
const Product = require("../../models/Product");
const ProductFinal = require("../../models/ProductFinal");
const Variants = require("../../models/ProductVariant");
const ProductTranslation = require("../../models/ProductTranslation");
const ProductCategories = require("../../models/ProductCategory");
const Restaurant = require("../../models/Restaurant");
const sequelize = require("../../util/database");
const c = require("config");
const { localsName } = require("ejs");

router.get("/:restaurantName/:lang", async (req, res) => {
  const params = req.params.restaurantName.split("-").join(" ");
  const lang = req.params.lang;
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

  // FROM foodnet.extras as ext INNER JOIN foodnet.extraTranslations as extTrans on ext.id = extTrans.extraId INNER JOIN  foodnet.productVariantsExtras as prodVariant ON ext.id = prodVariant.extraId WHERE prodVariant.productVariantId =${currentValue["variantId"]} AND prodVariant.active=1 and extTrans.languageId=2;
  return sequelize
    .query(
      `SELECT prodFin.variantId as variantId, catTrans.name as categoryName, adm.fullName as partnerName, prod.id as productId, prod.imageUrl as productImageUrl,
      prodTrans.title as productTitle, prodTrans.description productDescription, prodFin.price as productPrice,prodFin.discountedPrice as productDiscountedPrice
      FROM productFinals as prodFin 
      INNER JOIN products as prod ON prodFin.productId = prod.id INNER JOIN restaurants as adm On prod.restaurantId = adm.id 
      INNER JOIN productTranslations as prodTrans ON prodTrans.productId = prod.id 
      INNER JOIN productVariants as var ON prodFin.variantId = var.id
      INNER JOIN productCategories as cat
      on var.categoryId = cat.id
      inner join productCategoryTranslations as catTrans ON catTrans.productCategoryId = cat.id 

       WHERE catTrans.languageId =${languageCode}  and prodFin.active=1 and adm.fullName LIKE '%${params}%' AND
       prodTrans.languageId =${languageCode}
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
        };
        items.push(item);
      }
      const result = items.reduce((accumulator, currentValue) => {
        const { categoryName } = currentValue;
        const key = categoryName;
        accumulator[key] = accumulator[key] || [];
        accumulator[key].push(currentValue);
        return accumulator;
      }, Object.create(null));

      res.json({
        status: 200,
        msg: "Products list successfully listed",
        result,
      });
    });
});

router.get("/allergen/:restaurantName/:lang/:productId", async (req, res) => {
  const restaurantName = req.params.restaurantName.split("-").join(" ");
  console.log("----", restaurantName);
  const lang = req.params.lang;
  const productId = req.params.productId;
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
      `SELECT prod.id as product_id,al.id as allergen_id, alTrans.name as allergen_name, res.fullName as restaurant_name
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

router.get("/category/:restaurantName/:lang/:categoryId?", async (req, res) => {
  var categoryId = req.params.categoryId;
  const restaurantName = req.params.restaurantName.split("-").join(" ");
  const lang = req.params.lang;
  let languageCode;
  let checkCategory;

  if (categoryId != undefined) {
    checkCategory = await Categories.findAll({
      where: { id: categoryId },
    });
  }
  const checkRestaurant = await Restaurant.findAll({
    where: { fullName: restaurantName },
  });

  if (categoryId != undefined) {
    if (checkCategory[0].restaurantId != checkRestaurant[0].id) {
      return res.json({
        status: 400,
        msg: "This category does not belong to the restaurant!",
        result: [],
      });
    }
  }

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

  if (categoryId == undefined) {
    const result = await sequelize.query(
      `
    SELECT cat.id as category_id, catTrans.name as category_name
  	FROM productCategories as cat
    inner JOIN productCategoryTranslations as catTrans
    on cat.id = catTrans.productCategoryId
    inner join restaurants as res
    on res.id = cat.restaurantId
    WHERE catTrans.languageId= ${languageCode} AND res.fullName LIKE "%${restaurantName}%";
       `,
      { type: Sequelize.QueryTypes.SELECT }
    );
    return res.json({
      status: 200,
      msg: "Category list successfully listed",
      result,
    });
  } else {
    const result = await sequelize.query(
      `SELECT prod.id as productId, prod.imageUrl as productImageUrl, prodTrans.title as productTitle,
        prodTrans.description as productDescription, prodFin.price as productPrice, prodFin.discountedPrice as productDiscountedPrice,
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
                and cat.id = ${categoryId};
       `,
      { type: Sequelize.QueryTypes.SELECT }
    );
    if (result.length == 0) {
      return res.json({
        status: 404,
        msg: "Product not found in this category name",
        result,
      });
    }
    return res.json({
      status: 200,
      msg: "Successful filtering in the category",
      result,
    });
  }
});

module.exports = router;
