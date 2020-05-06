"use strict";
const { Order, OrderProduct } = require("../../models/order");
const product = require("../../models/product.model");
var connection_sql = require("./../../connections/mysql_connection");

//admin report 1 : No of orders per day.
let getAdminReport1 = async (msg, callback) => {
  try {
    console.log(msg);
    connection_sql.query(
      `Select
      count(createdAt) as count,
      substr(createdAt,1,10) as count_date
      from Orders 
      group by substr(createdAt,1,10)`,
      async (err, results, fields) => {
        if (err) {
          console.log(err);
          return callback({ status: 500, res: err }, null);
        } else {
          console.log(results);
          return callback(null, { status: 200, adminReport1: results });
        }
      }
    );
  } catch (err) {
    console.log(err);
  }
};

exports.getAdminReport1 = getAdminReport1;
