const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//
const restaurantProfileSchema = mongoose.Schema({
  open: {
    type: String,
    required: true
  },
  close: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  adminId: {
    type: Schema.Types.ObjectId,
    ref: "admin"
    // required: true
  }
});

module.exports = RestaurantProfile = mongoose.model(
  "restaurantprofile",
  restaurantProfileSchema
);
