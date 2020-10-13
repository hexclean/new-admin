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
  let test = [];
  restaurant = await Variants.findAll({
    include: [
      {
        model: Restaurant,
      },
    ],
  });
  for (let i = 0; i < restaurant.length; i++) {
    console.log();
    restaurantVarId.push(restaurant[i].id);
  }
  console.log(restaurantVarId);
  // console.log(restaurant);
  // userId = req.user.id
  // const product = [1];
  // const {
  //   product,
  //   message,
  //   restaurant_id,
  //   userDeliveryAddressId,
  //   quantity,
  // } = req.body;

  // var totalPrice = 0;
  // product.map((product) => {
  //   totalPrice += parseFloat(product.productPrice) * parseInt(product.quantity);
  // });

  const products = req.body.products;
  // products.map((prod) => {
  // test.push(prod.variantId);
  // console.log("--", prod);
  // if (prod.variantId !== restaurantVarId) {
  //   return console.log("dasdsadas");
  // }
  // });
  const order = await Order.create({
    // totalPrice: totalPrice,
    userId: req.user.id,
    restaurantId: 1,
    userDeliveryAdressId: 1,
  });

  const orderId = order.id;
  console.log("orderId", orderId);

  await Promise.all(
    products.map(async (prod) => {
      const orderItem = await OrderItem.create({
        message: prod.message,
        productVariantId: prod.variantId,
        quantity: prod.quantity,
        // price: product.productPrice,
        OrderId: orderId,
      });
      await OrderItemExtra.create({
        quantity: prod.quantity,
        OrderItemId: orderItem.id,
        extraId: 1,
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
