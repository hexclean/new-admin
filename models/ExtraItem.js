const mongoose = require("mongoose");

const extraItemSchema = mongoose.Schema({
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
  extraAddId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "extraadd"
  },
  adminId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "admin"
  },
  category: {
    ro: {
      type: String,
      enum: ["Crispy Box", "Pizza", "Pui", "Porc"],
      required: true
    },
    hu: {
      type: String,
      enum: ["Crispy Box", "Pizza", "Csirke", "Sertés"],
      required: true
    },
    en: {
      type: String,
      enum: ["Crispy Box", "Pizza", "Chicken", "Pig"],
      required: true
    }
  }
});

module.exports = ExtraItem = mongoose.model("extraItem", extraItemSchema);
