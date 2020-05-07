"use strict";
const { Order, OrderProduct } = require("../../models/order");
const product = require("../../models/product.model");
var connection_sql = require("./../../connections/mysql_connection");

let getSellerReport1 = async (msg, callback) => {
  try {
    console.log(msg);
    connection_sql.query(
      `select seller_email_id, Product_id, sum(TotalPrice) as totalProductPrice, sum(quantity) as totalProductQuantity from OrderProducts where seller_email_id=? and cancelProduct=0 and Status=6 group by seller_email_id,Product_id`,
      [msg.params.sellerEmailId],
      async (err, results, fields) => {
        if (err) {
          console.log(err);
          return callback({ status: 500, res: err }, null);
        } else {
          console.log('Report 1 for seller: '+msg.params.sellerEmailId);
          console.log(results);
          let report1Arr = [];
          const request = await results.map(async item => {
            const products = await product.findOne({
              sellerEmailId: msg.params.sellerEmailId
            });
            report1Arr.push({
              ...item,
              productName: products.productName,
              photo: products.photos ? products.photos[0] : ""
            });
          });
          Promise.all(request).then(() => {
            return callback(null, { status: 200, report1Arr });
          });
        }
      }
    );
  } catch (err) {
    console.log(err);
  }
};

exports.getSellerReport1 = getSellerReport1;
