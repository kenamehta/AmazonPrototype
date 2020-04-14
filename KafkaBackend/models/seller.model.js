const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sellerProfile = new Schema(
  {
    emailId: { type: String, required: true },
    name: { type: String, required: true },
    phone: { type: String },
    profilePictureUrl: { type: String, default: "default.png" },
    street: { type: String },
    city: { type: String },
    state: { type: String },
    country: { type: String },
    zipcode: { type: String }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("seller", sellerProfile);
