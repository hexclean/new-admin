const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },
  company: {
    type: String
  },

  location: {
    type: String
  },
  deliveryadress: [
    {
      street: {
        type: String
      },
      houseNumber: {
        type: String
      },
      blok: {
        type: String
      },
      apartament: {
        type: String
      },
      other: {
        type: String
      },
      phoneNumber: {
        type: String
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Profile = mongoose.model("profile", ProfileSchema);
