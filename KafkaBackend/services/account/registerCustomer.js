"use strict";
const bcrypt = require("bcrypt");
const { customerRegister } = require("../../models/registration");
const { customer } = require("../../models/customer.model");
const Mongoose = require("mongoose");
const uuid = require("uuid/v4");

let registerCustomer = async (msg, callback) => {
  const customer_register_sql = await customerRegister.create({
    _id: uuid(),
    name: msg.name,
    email: msg.email,
    password: bcrypt.hashSync(msg.password1, 10)
  });
  const customer_register_mongo = await customer.create({
    name: msg.name,
    email: msg.email
  });
  if (customer_register_sql && customer_register_mongo)
    return callback(null, { status: 200, res: "Customer Record Inserted" });
  else
    return callback(
      { status: 403, res: "Error caught while inserting record" },
      null
    );
};

exports.registerCustomer = registerCustomer;
