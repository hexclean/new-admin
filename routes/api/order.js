const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");
const OrderItemExtra = require("../../models/OrderItemExtra");
const Order = require("../../models/Order");
const Restaurant = require("../../models/Restaurant");
const User = require("../../models/User");
const OrderItem = require("../../models/OrderItem");
const Variants = require("../../models/ProductVariant");
const ProductVariantExtras = require("../../models/ProductVariantsExtras");
const ProductFinal = require("../../models/ProductFinal");
// @route    POST api/orders
// @desc     Create an order
// @access   Private
router.post("/", auth, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  let extraId = [1, 2, 3];
  let checkExtraPrice = [];
  let checkVariantPrice = [];
  let variantId = [1, 2];

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

  const deliveryAddressId = req.body.deliveryAddressId;
  const restaurantId = req.body.restaurantId;
  const products = req.body.products;
  const cutlery = req.body.cutlery;
  const take = req.body.take;

  var totalPrice = 0;
  var totalVariantPrice = 0;
  var totalExtraPrice = 0;
  let extraQuantityFrontend = [];
  let variantQuantityFrontend = [];

  products.map(async (products) => {
    totalVariantPrice +=
      parseFloat(products.variantPrice) * parseInt(products.quantity);
    variantQuantityFrontend.push(products.quantity);
    const extras = products.extras;
    extras.map((extra) => {
      totalExtraPrice +=
        parseFloat(extra.extraPrice) * parseInt(extra.quantity);
      extraQuantityFrontend.push(extra.quantity);
    });
  });
  totalPrice = totalVariantPrice + totalExtraPrice;

  async function sum() {
    let testVariant = checkVariantPrice;
    let testPrice = checkExtraPrice;
    let extraQuantity = extraQuantityFrontend;
    let variantQuantity = variantQuantityFrontend;

    var sum = testPrice.map(function (num, idx) {
      return num * extraQuantity[idx];
    });
    var sum2 = testVariant.map(function (num, idx) {
      return num * variantQuantity[idx];
    });

    if (sum2.reduce((a, b) => a + b, 0) !== totalExtraPrice) {
      console.log("MARHA");
    }

    console.log(sum2.reduce((a, b) => a + b, 0));
  }
  sum();

  const order = await Order.create({
    totalPrice: totalPrice,
    cutlery: cutlery,
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

  try {
    res.json(req.body);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
