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

  const deliveryAddressId = req.body.deliveryAddressId;
  const restaurantId = req.body.restaurantId;
  const products = req.body.products;
  var totalPrice = 0;

  // products.map((product) => {
  //   totalPrice += parseFloat(product.price) * parseInt(product.quantity);
  // });
  const order = await Order.create({
    // totalPrice: totalPrice,
    userId: req.user.id,
    restaurantId: restaurantId,
    userDeliveryAdressId: deliveryAddressId,
  });

  const orderId = order.id;

  await Promise.all(
    products.map(async (prod) => {
      console.log(prod);
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
        extraId: prod.extras.id,
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
