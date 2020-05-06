"use strict";
const { Order, OrderProduct } = require("../../models/order");
const product = require("../../models/product.model");
var connection_sql = require("./../../connections/mysql_connection");

//6: Top 10 products viewed per day.
let getAdminReport6 = async (msg, callback) => {
  try {
    console.log(msg);
    const products = await product.find();
    if (products) {
      let clickArr = [];
      products.map(item => {
        let lastClick = item.clickCountproducts
          ? item.clickCountproducts.clickCount.slice(-1).pop()
          : {};
        clickArr.push({
          productName: products.productName,
          productId: products._id,
          clickCount: lastClick.count
        });
      });

      function compare(a, b) {
        const countA = a.count;
        const countB = b.count;
        let comparison = 0;
        if (countA < countB) {
          comparison = 1;
        } else if (countA > countB) {
          comparison = -1;
        }
        return comparison;
      }
      clickArr.sort(compare);
      let first10 = clickArr.slice(1, 11);
      return callback(null, {
        status: 200,
        adminReport6: first10
      });
    } else {
      return callback({ status: 403 }, null);
    }
  } catch (err) {
    console.log(err);
  }
};

exports.getAdminReport6 = getAdminReport6;
