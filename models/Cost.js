const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//
const costSchema = mongoose.Schema({
  name: {
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
  adminId: {
    type: Schema.Types.ObjectId,
    ref: "admin"
  }
});

module.exports = Cost = mongoose.model("cost", costSchema);
