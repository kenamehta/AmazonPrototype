"use strict";
const { Order, OrderProduct } = require("../../models/order");
const product = require("../../models/product.model");
var connection_sql = require("./../../connections/mysql_connection");

let getSellerReport2 = async (msg, callback) => {
  try {
    console.log(msg);
    connection_sql.query(
      `select monthname(updatedAt) as month,YEAR(updatedAt) as year, sum(TotalPrice) as totalProductPrice, sum(quantity) as totalProductQuantity from OrderProducts where seller_email_id=? and cancelProduct=0 and Status=6 group by seller_email_id,substr(updatedAt,1,7)`,
      [msg.params.sellerEmailId],
      async (err, results, fields) => {
        if (err) {
          console.log(err);
          return callback({ status: 500, res: err }, null);
        } else {
          console.log('Report 2 for seller: '+msg.params.sellerEmailId);
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
