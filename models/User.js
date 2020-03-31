const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
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
  }
});

module.exports = User = mongoose.model("user", UserSchema);
