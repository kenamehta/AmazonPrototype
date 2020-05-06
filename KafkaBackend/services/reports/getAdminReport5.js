"use strict";
const { Order, OrderProduct } = require("../../models/order");
const product = require("../../models/product.model");
var connection_sql = require("./../../connections/mysql_connection");

//5: Top 10 products based on rating.
let getAdminReport5 = async (msg, callback) => {
  try {
    console.log(msg);
    const products = await product
      .find()
      .select({ averageRating: 1, productName: 1, _id: 0 })
      .sort({ averageRating: -1 })
      .limit(10);
    if (products) {
      return callback(null, {
        status: 200,
        adminReport5: products
      });
    } else {
      return callback({ status: 403 }, null);
    }
  } catch (err) {
    console.log(err);
  }
};

exports.getAdminReport5 = getAdminReport5;
