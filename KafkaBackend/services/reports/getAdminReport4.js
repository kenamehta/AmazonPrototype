"use strict";
const { Order, OrderProduct } = require("../../models/order");
const customer = require("../../models/customer.model");
var connection_sql = require("./../../connections/mysql_connection");

//4: Top 5 customers based on total purchase amount.
let getAdminReport4 = async (msg, callback) => {
  try {
    console.log(msg);
    connection_sql.query(
      `select * from (select customer_email_id,sum(TotalPrice) as purchase from OrderProducts group by customer_email_id) a order by a.purchase LIMIT 5`,
      async (err, results, fields) => {
        if (err) {
          console.log(err);
          return callback({ status: 500, res: err }, null);
        } else {
          console.log(results);
          let report4Arr = [];
          const request = await results.map(async item => {
            const customers = await customer.findOne({
              emailId: item.customer_email_id
            });
            report4Arr.push({
              ...item,
              customerName: customers.name
            });
          });
          Promise.all(request).then(() => {
            return callback(null, { status: 200, adminReport4: report4Arr });
          });
        }
      }
    );
  } catch (err) {
    console.log(err);
  }
};

exports.getAdminReport4 = getAdminReport4;
