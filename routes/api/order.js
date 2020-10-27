const express = require("express");
const jwt = require("jsonwebtoken");
const config = require("config");
const router = express.Router();
const orderUser = require("../../middleware/orderUser");
const { check, validationResult } = require("express-validator");
const OrderItemExtra = require("../../models/OrderItemExtra");
const Order = require("../../models/Order");
const Restaurant = require("../../models/Restaurant");
const User = require("../../models/User");
const UserDeliveryAddress = require("../../models/UserDeliveryAdress");
const OrderItem = require("../../models/OrderItem");
const Variants = require("../../models/ProductVariant");
const ProductVariantExtras = require("../../models/ProductVariantsExtras");
const ProductFinal = require("../../models/ProductFinal");

// @route    POST api/orders
// @desc     Create an order
// @access   Private
router.post("/", orderUser, async (req, res, next) => {
  const deliveryAddressId = req.body.deliveryAddressId;
  const restaurantId = req.body.restaurantId;
  const products = req.body.products;
  const cutlery = req.body.cutlery;
  const take = req.body.take;
  const token = req.header("x-auth-token");
  let checkUser;

  if (token != undefined) {
    checkUser = await User.findAll({
      where: { id: req.user.id },
      include: [
        {
          model: UserDeliveryAddress,
          where: { id: deliveryAddressId },
        },
      ],
    });
  } else {
    return next();
  }

  var totalPrice = 0;
  var totalVariantPrice = 0;
  var totalExtraPrice = 0;
  let extraQuantityFrontend = [];
  let variantQuantityFrontend = [];
  let frontendVariantId = [];
  let frontendExtraId = [];
  try {
    products.map(async (products) => {
      totalVariantPrice +=
        parseFloat(products.variantPrice) * parseInt(products.quantity);
      variantQuantityFrontend.push(products.quantity);
      frontendVariantId.push(products.variantId);
      const extras = products.extras;
      extras.map(async (extra) => {
        totalExtraPrice +=
          parseFloat(extra.extraPrice) * parseInt(extra.quantity);
        extraQuantityFrontend.push(extra.quantity);
        frontendExtraId.push(extra.id);
      });
    });
    totalPrice = totalVariantPrice + totalExtraPrice;
    let extraId = frontendExtraId;
    let checkExtraPrice = [];
    let checkVariantPrice = [];
    let variantId = frontendVariantId;

    const validateExtraPrice = await ProductVariantExtras.findAll({
      where: { extraId: extraId, productVariantId: variantId, active: 1 },
    });

    const validateVariantPrice = await ProductFinal.findAll({
      where: { variantId: variantId, active: 1 },
    });

    for (let i = 0; i < validateExtraPrice.length; i++) {
      checkExtraPrice[i] = validateExtraPrice[i].price;
    }

    for (let i = 0; i < validateVariantPrice.length; i++) {
      checkVariantPrice[i] = validateVariantPrice[i].price;
    }

    let testVariant = checkVariantPrice;
    let testPrice = checkExtraPrice;
    let extraQuantity = extraQuantityFrontend;
    let variantQuantity = variantQuantityFrontend;
    let checkRestaurantId = validateExtraPrice[0].restaurantId;

    var finalServerValudationExtra = testPrice.map(function (num, idx) {
      return num * extraQuantity[idx];
    });
    var finalServerValudationVariant = testVariant.map(function (num, idx) {
      return num * variantQuantity[idx];
    });

    let validateServerExtraPrice = 0;
    let validateServerVariantPrice = 0;

    validateServerExtraPrice = finalServerValudationExtra.reduce(
      (a, b) => a + b,
      0
    );

    validateServerVariantPrice = finalServerValudationVariant.reduce(
      (a, b) => a + b,
      0
    );

    if (
      validateServerExtraPrice != totalExtraPrice ||
      validateServerVariantPrice != totalVariantPrice ||
      checkRestaurantId != restaurantId ||
      checkUser.length < 1 ||
      (cutlery != 0 && cutlery != 1) ||
      (take != 0 && take != 1)
    ) {
      return res
        .status(404)
        .json({ msg: "You can't buy! Please don't cheat ..." });
    }
    if (token != undefined) {
      const order = await Order.create({
        totalPrice: totalPrice,
        cutlery: cutlery,
        orderType: 0,
        take: take,
        userId: req.user.id,
        restaurantId: restaurantId,
        userDeliveryAdressId: deliveryAddressId,
      });

      const orderId = order.id;

      await Promise.all(
        products.map(async (prod) => {
          const extras = prod.extras;
          extras.map(async (extras) => {
            const orderItem = await OrderItem.create({
              message: prod.message,
              productVariantId: prod.variantId,
              quantity: prod.quantity,
              OrderId: orderId,
            });

            await OrderItemExtra.create({
              quantity: prod.quantity,
              OrderItemId: orderItem.id,
              extraId: extras.id,
            });
          });
        })
      );
    } else {
      const order = await Order.create({
        totalPrice: totalPrice,
        cutlery: cutlery,
        orderType: 1,
        city: "Vasarhely",
        take: take,
        restaurantId: restaurantId,
      });

      const orderId = order.id;

      await Promise.all(
        products.map(async (prod) => {
          const extras = prod.extras;
          extras.map(async (extras) => {
            const orderItem = await OrderItem.create({
              message: prod.message,
              productVariantId: prod.variantId,
              quantity: prod.quantity,
              OrderId: orderId,
            });

            await OrderItemExtra.create({
              quantity: prod.quantity,
              OrderItemId: orderItem.id,
              extraId: extras.id,
            });
          });
        })
      );
    }

    return res.json(req.body);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
