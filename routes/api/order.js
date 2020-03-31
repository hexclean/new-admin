const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");

const Order = require("../../models/Orders");
const User = require("../../models/User")
const OrderItem = require("../../models/OrderItem");

// @route    POST api/orders
// @desc     Create an order
// @access   Private
router.post("/", auth, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { restaurant_id, products } = req.body;
  var totalPrice = 0;
  products.map(product => {
    totalPrice += parseFloat(product.price) * parseInt(product.quantity);
  });
  
  
  const order = new Order({
    totalPrice: totalPrice,
    user: req.user.id,
    admin: restaurant_id,
    status: "Rendelve"
  });

  order.save((err, savedOrder) => {
    const { _id: savedOrderId } = savedOrder;
    products.map(product => {
      const item = new OrderItem({
        quantity: product.quantity,
        product: product.product,
        price: product.price,
        orderId: savedOrderId,
        user: req.user.id
      });
      User.findById({_id: req.user.id})
      .then(user => {
        user.adminId = restaurant_id;
       user.dbOrder += 1;
        user.totalOrder += totalPrice;
        return user.save()
      })
      item.save();
    });
  });


 
  try {
    res.json(order);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
