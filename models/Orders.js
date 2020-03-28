const mongoose = require("mongoose");

const ordersSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "admin"
  },
  totalPrice: {
    type: Number
  },
  date: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ["Rendelve", "amur"],
    required: true
  },
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "orderItem"
  }
});

module.exports = Orders = mongoose.model("orders", ordersSchema);
