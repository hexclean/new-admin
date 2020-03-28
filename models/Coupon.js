const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CouponSchema = new mongoose.Schema({
  name: {
    type: String
  },
  discount: {
    type: Number
  },
  date: {
    type: Date,
    default: Date.now
  },
  adminId: {
    type: Schema.Types.ObjectId,
    ref: "admin"
  }
});

module.exports = Coupon = mongoose.model("coupon", CouponSchema);
