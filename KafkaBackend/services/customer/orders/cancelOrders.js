"use strict";
const { Order, OrderProduct } = require("../../../models/order");
const product = require("../../../models/product.model");

let cancelOrders = async (msg, callback) => {
  let response = {};
  let err = {};
  try {
    
} catch (error) {
    console.log(error);
    err.status = 500;
    err.data = {
      errors: {
        body: error,
      },
    };
    return callback(error, null);
  }
};

exports.cancelOrders = cancelOrders;
