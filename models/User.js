const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    text: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  totalOrder:{
    type: Number
  },
  dbOrder:{
    type: Number
  },
  adminId: {
    type: Schema.Types.ObjectId,
    ref: "admin"
  },
  phoneNumber:{
    type: String
  }
});

module.exports = User = mongoose.model("user", UserSchema);
