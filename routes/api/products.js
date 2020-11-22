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

const sequelize = require("../../util/database");

router.get("/:restaurantName/:catego", async (req, res) => {
  const params = req.params.restaurantName.split("-").join(" ");
  const egy = 1;

  // FROM foodnet.extras as ext INNER JOIN foodnet.extraTranslations as extTrans on ext.id = extTrans.extraId INNER JOIN  foodnet.productVariantsExtras as prodVariant ON ext.id = prodVariant.extraId WHERE prodVariant.productVariantId =${currentValue["variantId"]} AND prodVariant.active=1 and extTrans.languageId=2;
  return sequelize
    .query(
      `SELECT prodFin.variantId as variantId, catTrans.name as categoryName, adm.fullName as partnerName, prod.id as productId, prod.imageUrl as productImageUrl, prodTrans.title as productTitle, prodTrans.description productDescription, prodFin.price as productPrice, prodFin.discountedPrice as productDiscountedPrice
      FROM productFinals as prodFin 
      INNER JOIN products as prod ON prodFin.productId = prod.id INNER JOIN restaurants as adm On prod.restaurantId = adm.id 
      INNER JOIN productTranslations as prodTrans ON prodTrans.productId = prod.id 
      INNER JOIN productVariants as var ON prodFin.variantId = var.id
      INNER JOIN productCategories as cat
      on var.categoryId = cat.id
      inner join productCategoryTranslations as catTrans ON catTrans.productCategoryId = cat.id 

       WHERE catTrans.languageId =2  and prodTrans.languageId =2 and prodFin.active=${egy} and adm.fullName LIKE '%${params}%'`,
      { type: Sequelize.QueryTypes.SELECT }
    )
    .then((results) => {
      const items = [];
      for (let d of results) {
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
          extras: [],
          allergens: [],
        };
        items.push(item);
      }
      const groupedByCategory = items.reduce((accumulator, currentValue) => {
        const { categoryName } = currentValue;
        const key = categoryName;
        accumulator[key] = accumulator[key] || [];
        accumulator[key].push(currentValue);
        return accumulator;
      }, Object.create(null));

      return res.json(groupedByCategory);
    });
});

router.get("/variant/:id/extras/:lang", async (req, res) => {
  const variantId = req.params.id;
  let languageCode;
  let lang = req.params.lang;
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
  return sequelize
    .query(
      `SELECT extTrans.id AS extra_id, extTrans.name AS extra_name,
      prodVrExt.price AS extra_price, prodVrExt.discountedPrice AS extra_discountedPrice,
      prodVrExt.quantityMin AS extra_minQuantity, prodVrExt.quantityMax AS extra_maxQuantity,
      allTrans.allergenId as allergen_id, allTrans.name AS allergen_name
      FROM productVariantsExtras as prodVrExt 
      INNER JOIN extras as ext
      ON prodVrExt.extraId = ext.id
      INNER JOIN extraTranslations as extTrans
      On extTrans.extraId = ext.id 
      INNER JOIN extraHasAllergens as extAll
      ON extAll.extraId = ext.id
      INNER JOIN allergens as al
      ON al.id = extAll.allergenId
      INNER JOIN allergenTranslations as allTrans
      ON allTrans.allergenId = al.id
      WHERE prodVrExt.productVariantId = ${variantId}
      AND prodVrExt.active = 1

      AND extTrans.languageId = ${languageCode}
      AND allTrans.languageId = ${languageCode}
      `,
      { type: Sequelize.QueryTypes.SELECT }
    )
    .then((results) => {
      const groupedByExtra = [];
      for (let d of results) {
        const allergens = {
          allergen_id: d.allergen_id,
          allergen_name: d.allergen_name,
        };
        const item = {
          extra_id: d.extra_id,
          extra_name: d.extra_name,
          extra_price: d.extra_price,
          extra_discountedPrice: d.extra_discountedPrice,
          extra_minQuantity: d.extra_minQuantity,
          extra_maxQuantity: d.extra_maxQuantity,
          productDescription: d.productDescription,
          allergens: [],
        };
        item.allergens = allergens;
        groupedByExtra.push(item);
      }
      let groupByExtras = groupedByExtra.reduce((r, a) => {
        r[a.extra_id] = [...(r[a.extra_id] || []), a];
        return r;
      }, {});

      const items = [];
      for (const [key, value] of Object.entries(groupByExtras)) {
        let item = {};
        if (value.length > 1) {
          let allergens = [];
          let product = value[0];
          item = {
            extra_id: product.extra_id,
            extra_name: product.extra_name,
            extra_price: product.extra_price,
            extra_discountedPrice: product.extra_discountedPrice,
            extra_minQuantity: product.extra_minQuantity,
            extra_maxQuantity: product.extra_maxQuantity,
            productDescription: product.productDescription,
            allergens: [],
          };
          for (let d of value) {
            allergens.push({
              allergen_id: d.allergens.allergen_id,
              allergen_name: d.allergens.allergen_name,
            });
          }
          item.allergens = allergens;
        } else {
          item = value.shift();
        }
        items.push(item);
      }
      const groupedByCategory = items.reduce((accumulator, currentValue) => {
        const { extra_name } = currentValue;
        const key = extra_name;
        accumulator[key] = accumulator[key] || [];
        accumulator[key].push(currentValue);
        return accumulator;
      }, Object.create(null));

      return res.json(groupedByCategory);
    });
});

router.get("/variant/:id/allergens", async (req, res) => {
  const variantId = req.params.id;
  return res.json(variantId);
});

router.get("/", async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [
        {
          model: ProductTranslation,
        },
        {
          model: ProductFinal,
          // model: Variants,
        },
      ],
    });

    res.json(products);
    console.log("products", products);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route    GET api/products
// @desc    Get all products
// @access   Private
router.get("/:admin_id", async (req, res) => {
  try {
    const id = req.params.admin_id;
    // Product.find({ restaurantId: req.admin._id })
    const product = await Product.find({ restaurantId: id });
    if (!product) {
      return res.status(404).json({
        msg: "Product not foudasdndr33333",
      });
    }
    res.json(product);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({
        msg: "Product not found!!!!!",
      });
    }
    res.status(500).send("Server error");
  }
});

// // @route    GET api/profile/user/:user_id
// // @desc     Get profile by user ID
// // @access   Public
// router.get("/products/:admin._id", async (req, res) => {
//   try {
//     const restaurantId = req.params.admin._id;

//     const profile = await Product.find({ restaurantId: req.admin._id });
//     console.log(id);
//     console.log(profile);
//     if (!profile) return res.status(400).json({ msg: "Probhjbhjbhjhjbfile not found" });

//     res.json(profile);
//   } catch (err) {
//     console.error(err.message);
//     if (err.kind == "ObjectId") {
//       return res.status(400).json({ msg: "Profile not found" });
//     }
//     res.status(500).send("Server Error");
//   }
// });

module.exports = router;
