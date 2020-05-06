"use strict";
const { Order, OrderProduct } = require("../../models/order");
const seller = require("../../models/seller.model");
var connection_sql = require("./../../connections/mysql_connection");

//3: Top 5 sellers based on total sales amount.
let getAdminReport3 = async (msg, callback) => {
  try {
    console.log(msg);
    connection_sql.query(
      `select * from (select seller_email_id,sum(TotalPrice) as sales from OrderProducts group by seller_email_id) a order by a.sales LIMIT 5`,
      async (err, results, fields) => {
        if (err) {
          console.log(err);
          return callback({ status: 500, res: err }, null);
        } else {
          console.log(results);
          let report3Arr = [];
          const request = await results.map(async item => {
            const sellers = await seller.findOne({
              emailId: item.seller_email_id
            });
            report3Arr.push({
              ...item,
              sellerName: sellers.name
            });
          });
          Promise.all(request).then(() => {
            return callback(null, { status: 200, adminReport3: report3Arr });
          });
        }
      }
    );
  } catch (err) {
    console.log(err);
  }
};

exports.getAdminReport3 = getAdminReport3;
