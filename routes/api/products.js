const express = require("express");
const router = express.Router();
const db = require("../../server");
const Sequelize = require("sequelize");

const Product = require("../../models/Product");
const ProductFinal = require("../../models/ProductFinal");
const Variants = require("../../models/ProductVariant");
const VariantsTranslation = require("../../models/ProductVariantTranslation");
const ProductTranslation = require("../../models/ProductTranslation");
const ProductCategories = require("../../models/ProductCategory");
router.get("/test", async (req, res) => {
  // try {
  //   const products = await ProductFinal.findAll({
  //     include: [
  //       {
  //         model: Product,
  //         include: [
  //           {
  //             model: Variants,
  //             include: [
  //               {
  //                 model: VariantsTranslation,
  //                 include: [
  //                   {
  //                     model: ProductCategories,
  //                   },
  //                 ],
  //               },
  //             ],
  //           },
  //         ],
  //         as: "theProductId",
  //         include: [
  //           {
  //             model: ProductTranslation,
  //           },
  //         ],
  //       },
  //     ],
  //   });

  //   res.json(products);
  //   console.log("products", products);
  // } catch (err) {
  //   console.error(err.message);
  //   res.status(500).send("Server error");
  // }
  const sequelize = new Sequelize("foodnet", "root", "y7b5uwFOODNET", {
    host: "localhost",
    dialect: "mysql",
  });
  sequelize
    .query(
      "SELECT prodFin.id as productFinalId, prodFin.price as productFinalPrice, prodFin.discountedPrice as productFinalDiscPrice, var.id as variantId, var.active as variantActive, prod.imageUrl as productImageUrl, prod.id as productId, prodTrans.id as productTranslationId, prodVarExt.id as productVarExtraId, prodVarExt.price as productVarExtraPrice, prodVarExt.discountedPrice as productVarExtraDiscPrice, prodVarExt.quantityMax as productVarExtraMax, prodVarExt.quantityMin as productVarExtraMin, prodVarExt.active as productVarExtraActive, prodTrans.description as productTranslationDesc, prodTrans.title as productTitle, prodTrans.description as productDesc, catTrans.name as categoryName  FROM foodnet.productFinals as prodFin INNER JOIN foodnet.products as prod ON prodFin.productId = prod.id INNER JOIN foodnet.productTranslations as prodTrans ON prodTrans.productId = prod.id INNER JOIN foodnet.productVariants as var ON prodFin.variantId = var.id INNER JOIN foodnet.productVariantTranslations as varTrans ON varTrans.productVariantId = var.id INNER JOIN foodnet.productCategories as cat ON cat.id = varTrans.categoryId inner join foodnet.productCategoryTranslations as catTrans ON catTrans.productCategoryId = cat.id INNER JOIN foodnet.productVariantsExtras as prodVarExt on prodVarExt.productVariantId = varTrans.id INNER JOIN foodnet.extras as ext on ext.id = prodVarExt.extraId INNER JOIN foodnet.extraTranslations as extTrans  on extTrans.extraId = ext.id where prodTrans.languageId =1 and varTrans.languageId =1 and catTrans.languageId =1 and extTrans.languageId =1;"
    )
    .then((results) => {
      res.json(results);
      console.log(results);
    });
  const { QueryTypes } = require("sequelize");
  const test = await sequelize.query("SELECT * FROM admins", {
    type: QueryTypes.SELECT,
  });
});

// Product.findAll({
//   where: {
//     id: prodId,
//     adminId: req.admin.id,
//   },
//   include: [
//     {
//       model: ProductTranslation,
//     },
//     { model: ProductFinal },
//   ],
// });

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
    // Product.find({ adminId: req.admin._id })
    const product = await Product.find({ adminId: id });
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
//     const adminId = req.params.admin._id;

//     const profile = await Product.find({ adminId: req.admin._id });
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
