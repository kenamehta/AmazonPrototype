"use strict";
const { Order, OrderProduct } = require("../../models/order");
const product = require("../../models/product.model");
var connection_sql = require("./../../connections/mysql_connection");

let getSellerReport2 = async (msg, callback) => {
  try {
    console.log(msg);
    connection_sql.query(
      `select monthname(updatedAt) as month, sum(TotalPrice) as totalProductPrice, sum(quantity) as totalProductQuantity from OrderProducts where seller_email_id='2013uec1108@mnit.ac.in' and cancelProduct=0 and Status=6 group by seller_email_id,monthname(updatedAt)`,
      [msg.params.sellerEmailId],
      async (err, results, fields) => {
        if (err) {
          console.log(err);
          return callback({ status: 500, res: err }, null);
        } else {
          console.log(results);
          return callback(null, { status: 200, results });
        }
      }
    );
  } catch (err) {
    console.log(err);
  }
};

exports.getSellerReport2 = getSellerReport2;
