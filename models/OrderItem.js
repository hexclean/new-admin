const mongoose = require("mongoose");

const orderItemSchema = mongoose.Schema({
  quantity: {
    type: Number,
    default: 1
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "product"
  },
  price: {
    type: Number
  },
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "orders"
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  }
});

module.exports = OrderItem = mongoose.model("orderItem", orderItemSchema);
