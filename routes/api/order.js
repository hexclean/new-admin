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
// @route    POST api/orders
// @desc     Create an order
// @access   Private
router.post("/", auth, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  let restaurant = [];
  let restaurantVarId = [];
  let extraId = [1, 2, 3];
  let checkExtraPrice = [];
  let variantId = [1, 2];

  const validateFinalPrice = await ProductVariantExtras.findAll({
    where: { extraId: extraId, productVariantId: variantId, active: 1 },
  });

  for (let i = 0; i < validateFinalPrice.length; i++) {
    checkExtraPrice[i] = validateFinalPrice[i].price;
    // checkExtraPrice.push("extraId" + validateFinalPrice[i].price);
  }

  // console.log(checkExtraPrice);
  // console.log(checkExtraPrice.reduce((a, b) => a + b, 0));

  const deliveryAddressId = req.body.deliveryAddressId;
  const restaurantId = req.body.restaurantId;
  const products = req.body.products;
  const cutlery = req.body.cutlery;
  const take = req.body.take;

  var totalPrice = 0;
  var totalVariantPrice = 0;
  var totalExtraPrice = 0;
  let extraQuantityFrontend;
  products.map(async (products) => {
    totalVariantPrice +=
      parseFloat(products.variantPrice) * parseInt(products.quantity);

    const extras = products.extras;
    extras.map((extra) => {
      totalExtraPrice +=
        parseFloat(extra.extraPrice) * parseInt(extra.quantity);
      // extraQuantityFrontend.push(extra.quantity);
    });
  });
  totalPrice = totalVariantPrice + totalExtraPrice;
  async function sum() {
    // console.log(checkExtraPrice);
    let validateSum = checkExtraPrice;
    let testPrice = checkExtraPrice;
    let testArray = [1, 10, 10];
    let quantityExtra = extraQuantityFrontend;

    var sum = testPrice.map(function (num, idx) {
      return num * testArray[idx];
    });
    // int a[] = {2, 6, 1, 4};
    // int b[] = {2, 1, 4, 4};
    // int result[] = new int[a.length];
    // Arrays.setAll(result, i -> a[i] + b[i]);
    console.log(sum.reduce((a, b) => a + b, 0));
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
