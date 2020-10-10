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

router.get("/:locationName/:partnerId", async (req, res) => {
  const params = req.params.partnerId.split("-").join(" ");
  const egy = 1;

  // FROM foodnet.extras as ext INNER JOIN foodnet.extraTranslations as extTrans on ext.id = extTrans.extraId INNER JOIN  foodnet.productVariantsExtras as prodVariant ON ext.id = prodVariant.extraId WHERE prodVariant.productVariantId =${currentValue["VRID"]} AND prodVariant.active=1 and extTrans.languageId=2;
  return sequelize
    .query(
      `SELECT prodFin.variantId as VRID, catTrans.name as categoryName, adm.fullName as partnerName, prod.id as productId, prod.imageUrl as productImageUrl, prodTrans.title as productTitle, prodTrans.description productDescription, prodFin.price as productPrice, prodFin.discountedPrice as productDiscountedPrice,
      varExtras.extraId as extraId, extTrans.name, varExtras.price  as price, varExtras.discountedPrice as discountedPrice, varExtras.quantityMin as minOrder, varExtras.quantityMax as maxOrder
      FROM foodnet.productFinals as prodFin 
      INNER JOIN foodnet.products as prod ON prodFin.productId = prod.id INNER JOIN foodnet.restaurants as adm On prod.restaurantId = adm.id 
      INNER JOIN foodnet.productTranslations as prodTrans ON prodTrans.productId = prod.id 
      INNER JOIN foodnet.productVariants as var ON prodFin.variantId = var.id
      INNER JOIN foodnet.productCategories as cat
      on var.categoryId = cat.id
      inner join foodnet.productCategoryTranslations as catTrans ON catTrans.productCategoryId = cat.id 
      LEFT JOIN foodnet.productVariantsExtras as varExtras
      on varExtras.productVariantId = var.id
      left join foodnet.extras as ext on ext.id = varExtras.extraId 
      left join foodnet.extraTranslations as extTrans on extTrans.extraId = ext.id
       WHERE catTrans.languageId =2 AND extTrans.languageId=2 and prodTrans.languageId =2 and prodFin.active=${egy} and adm.fullName LIKE '%${params}%' and varExtras.active=1;`,
      { type: Sequelize.QueryTypes.SELECT }
    )
    .then((results) => {
      const groupedByExtra = [];
      for (let d of results) {
        const extras = {
          extraId: d.extraId,
          name: d.name,
          price: d.price,
          discountedPrice: d.discountedPrice,
          minOrder: d.minOrder,
          maxOrder: d.maxOrder,
        };
        const item = {
          VRID: d.VRID,
          categoryName: d.categoryName,
          partnerName: d.partnerName,
          productId: d.productId,
          productImageUrl: d.productImageUrl,
          productTitle: d.productTitle,
          productDescription: d.productDescription,
          productPrice: d.productPrice,
          productDiscountedPrice: d.productDiscountedPrice,
          extras: [],
        };
        item.extras = extras;
        groupedByExtra.push(item);
      }
      let groupByExtras = groupedByExtra.reduce((r, a) => {
        r[a.VRID] = [...(r[a.VRID] || []), a];
        return r;
      }, {});
      const items = [];
      for (const [key, value] of Object.entries(groupByExtras)) {
        let item = {};
        if (value.length > 1) {
          let extras = [];
          let product = value[0];
          item = {
            VRID: product.VRID,
            categoryName: product.categoryName,
            partnerName: product.partnerName,
            productId: product.productId,
            productImageUrl: product.productImageUrl,
            productTitle: product.productTitle,
            productDescription: product.productDescription,
            productPrice: product.productPrice,
            productDiscountedPrice: product.productDiscountedPrice,
            extras: [],
          };
          for (let d of value) {
            console.log(value);
            extras.push({
              extraId: d.extras.extraId,
              name: d.extras.name,
              price: d.extras.price,
              discountedPrice: d.extras.discountedPrice,
              minOrder: d.extras.minOrder,
              maxOrder: d.extras.maxOrder,
            });
            // console.log(extras);
          }
          item.extras = extras;
        } else {
          item = value.shift();
        }
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
