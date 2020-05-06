const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const uniqueValidator = require("mongoose-unique-validator");

const sellerProfile = new Schema(
  {
    emailId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    phone: { type: String, default:"" },
    profilePictureUrl: { type: String, default: "default.png" },
    street: { type: String, default:"" },
    city: { type: String, default:"" },
    state: { type: String, default:"" },
    country: { type: String, default:"" },
    zipcode: { type: String, default:"" }
  },
  {
    timestamps: true
  }
);
sellerProfile.plugin(uniqueValidator);

module.exports = mongoose.model("seller", sellerProfile);
