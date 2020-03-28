const mongoose = require("mongoose");

const DeliveryAdressSchema = new mongoose.Schema({
  street: {
    type: String,
    required: true
  },
  houseNumber: {
    type: String,
    required: true
  },
  blok: {
    type: String
  },
  apartament: {
    type: String
  },
  other: {
    type: String,
    required: false
  },
  phoneNumber: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true
  }
});

module.exports = DeliveryAdress = mongoose.model(
  "deliveryadress",
  DeliveryAdressSchema
);
