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
  dailyMenuTime: {
    type: Date
  },
  dailyVegan: {
    ro: {
      type: String,
      enum: ["Da", "Nu"]
    },
    hu: {
      type: String,
      enum: ["Igen", "Nem"]
    },
    en: {
      type: String,
      enum: ["Yes", "No"]
    }
  }
});

module.exports = Product = mongoose.model("product", productSchema);
