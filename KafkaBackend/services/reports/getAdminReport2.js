"use strict";
const { Order, OrderProduct } = require("../../models/order");
const product = require("../../models/product.model");
var connection_sql = require("./../../connections/mysql_connection");

//2: Top 5 most sold products.
let getAdminReport2 = async (msg, callback) => {
  try {
    console.log(msg);
    connection_sql.query(
      `select * from (select Product_id,sum(quantity) as count from OrderProducts group by Product_id) a order by a.count desc LIMIT 5`,
      async (err, results, fields) => {
        if (err) {
          console.log(err);
          return callback({ status: 500, res: err }, null);
        } else {
          console.log(results);
          let report2Arr = [];
          const request = await results.map(async item => {
            const products = await product.findOne({
              _id: item.Product_id
            });
            report2Arr.push({
              ...item,
              productName: products.productName,
              sellerEmailId: products.sellerEmailId
            });
          });
          Promise.all(request).then(() => {
            return callback(null, { status: 200, adminReport2: report2Arr });
          });
        }
      }
    );
  } catch (err) {
    console.log(err);
  }
};

exports.getAdminReport2 = getAdminReport2;
