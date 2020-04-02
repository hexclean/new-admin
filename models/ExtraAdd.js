const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//
const extraAddSchema = mongoose.Schema({
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
  price: {
    type: Number
  },
  status: {
    type: Number
  },
  extraItemId: {
    type: Schema.Types.ObjectId,
    ref: "admin"
  }
});

module.exports = ExtraAdd = mongoose.model("extraadd", extraAddSchema);
