const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//
const productSchema = mongoose.Schema({
  title: {
    ro: {
      type: String,
      required: true,
      text: true
    },
    hu: {
      type: String,
      required: true,
      text: true
    },
    en: {
      type: String,
      required: true,
      text: true
    }
  },
  description: {
    ro: {
      type: String,
      required: true
    },
    hu: {
      type: String,
      require: true
    },
    en: {
      type: String,
      require: true
    }
  },
  category: {
    ro: {
      type: String,
      enum: ["meniulZilei", "pizza", "soup", "Meniul Zilei"],
      required: true
    },
    hu: {
      type: String,
      enum: ["Daily Menu", "amur", "kotesek", "Napi Menü", "ponty"],
      required: true
    },
    en: {
      type: String,
      enum: ["ponty", "amur", "kotesek", "Daily Menu"],
      required: true
    }
  },

  imageUrl: {
    type: String
  },
  extraPrice: {
    type: Number
  },
  price: {
    type: Number
  },
  active: {
  type: Number
  },
  adminId: {
    type: Schema.Types.ObjectId,
    ref: "admin"
  },
  dailyMenu: {
    type: String
  },
  dailyMenuTime:{
    type: Date
  }
});

module.exports = Product = mongoose.model("product", productSchema);
