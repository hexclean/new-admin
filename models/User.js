const mongoose = require("mongoose");

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
  }
});

module.exports = User = mongoose.model("user", UserSchema);
