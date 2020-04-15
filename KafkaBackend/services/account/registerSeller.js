"use strict";
const bcrypt = require("bcrypt");
const { sellerRegister } = require("../../models/registration");
const seller = require("../../models/seller.model");
const Mongoose = require("mongoose");
const uuid = require("uuid/v4");

let registerSeller = async (msg, callback) => {
  try {
    const check = await sellerRegister.findOne({
      where: { emailId: msg.email }
    });
    if (check)
      return callback({ status: 403, res: "Account already exists" }, null);
    else {
      const seller_register_sql = await sellerRegister.create({
        _id: uuid(),
        name: msg.name,
        emailId: msg.email,
        password: bcrypt.hashSync(msg.password1, 10)
      });
      const seller_register_mongo = await seller.create({
        name: msg.name,
        emailId: msg.email
      });
      if (seller_register_sql && seller_register_mongo) {
        return callback(null, { status: 200, res: "" });
      } else {
        return callback(
          { status: 500, res: "Error caught while inserting record" },
          null
        );
      }
    }
  } catch (err) {
    return callback(
      { status: 500, res: "Error caught while inserting record", err },
      null
    );
  }
};

exports.registerSeller = registerSeller;
