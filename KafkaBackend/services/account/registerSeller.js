"use strict";
var express = require("express");
const bcrypt = require("bcrypt");
const { sellerRegister } = require("../../models/registration");
const { seller } = require("../../models/seller.model");
const Mongoose = require("mongoose");
const uuid = require("uuid/v4");

let registerSeller = async (msg, callback) => {
  const seller_register_sql = await sellerRegister.create({
    _id: uuid(),
    name: msg.name,
    email: msg.email,
    password: bcrypt.hashSync(msg.password1, 10)
  });
  const seller_register_mongo = await seller.create({
    name: msg.name,
    email: msg.email
  });
  if (seller_register_sql && seller_register_mongo)
    return callback(null, { status: 200, res: "Seller Record Inserted" });
  else
    return callback(
      { status: 403, res: "Error caught while inserting record" },
      null
    );
};

exports.registerSeller = registerSeller;
