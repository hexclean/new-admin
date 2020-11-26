const ProductFinal = require("../../models/ProductFinal");
const Variant = require("../../models/Variant");
const User = require("../../models/User");
const ProductReview = require("../../models/ProductsReview");
const Restaurant = require("../../models/Restaurant");
const RestaurantRole = require("../../models/RestaurantRole");
const Product = require("../../models/Product");
const Sequelize = require("sequelize");
const sequelize = require("../../util/database");

exports.getProductsReview = async (req, res, next) => {
  const restaurantRole = await Restaurant.findAll({
    where: { id: req.admin.id },
    include: [
      {
        model: RestaurantRole,
      },
    ],
  });

  await sequelize
    .query(
      `SELECT * FROM
      ProductsReviews as productReview
      INNER JOIN productVariants AS variants
      ON productReview.productVariantId = variants.id
      INNER JOIN productFinals AS productFinals
      ON productFinals.variantId = variants.id
      INNER JOIN products as prod
      ON prod.id = productFinals.productId
      INNER JOIN productTranslations as prodTrans
      ON prod.id = prodTrans.productId
      WHERE prodTrans.languageId = 2 AND productFinals.review =1`,
      { type: Sequelize.QueryTypes.SELECT }
    )

    .then((review) => {
      var sum = 0;
      for (var i = 0; i < review.length; i++) {
        sum += review[i].rating;
      }
      var avg = sum / review.length;
      res.render("reviews/product", {
        pageTitle: "Admin Products",
        path: "/admin/products",
        review: review,
        avg: avg,
      });
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};
