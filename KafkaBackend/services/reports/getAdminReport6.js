"use strict";
const { Order, OrderProduct } = require("../../models/order");
const clickCount = require("../../models/clickCount.model");
var connection_sql = require("./../../connections/mysql_connection");

//6: Top 10 products viewed per day.
let getAdminReport6 = async (msg, callback) => {
  try {
    console.log(msg);
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();
    today = mm + "/" + dd + "/" + yyyy;
    console.log(today.toString());
    const clicks = await clickCount
      .find({
        lastViewedCustomDate: today.toString()
      })
      .select({ lastViewedCustomDate: 1, count: 1, productName: 1, _id: 0 })
      .sort({ count: -1 })
      .limit(10);
    return callback(null, { status: 200, clicksArr: clicks });
  } catch (err) {
    console.log(err);
  }
};

exports.getAdminReport6 = getAdminReport6;
