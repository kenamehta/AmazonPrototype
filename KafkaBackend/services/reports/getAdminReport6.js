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

    const clicks = await clickCount.find({});
    console.log(clicks);

    return callback(null, { status: 200 });
    // const products = await product.find();
    // if (products) {
    //   let clickArr = [];
    //   products.map(item => {
    //     let lastClick = item.clickCount ? item.clickCount.slice(-1).pop() : {};
    //     console.log("lastClick");
    //     console.log(lastClick);
    //     clickArr.push({
    //       productName: item.productName,
    //       productId: item._id,
    //       clickCount: lastClick.count
    //     });
    //   });
    //   //   console.log("clickArr");
    //   //   console.log(clickArr);
    //   function compare(a, b) {
    //     const countA = a.count;
    //     const countB = b.count;
    //     let comparison = 0;
    //     if (countA < countB) {
    //       comparison = 1;
    //     } else if (countA > countB) {
    //       comparison = -1;
    //     }
    //     return comparison;
    //   }
    //   //   clickArr.sort(compare);
    //   //   console.log("clickArr");
    //   //   console.log(clickArr);
    //   let first10 = clickArr.slice(1, 11);
    //   return callback(null, {
    //     status: 200,
    //     adminReport6: first10
    //   });
    // } else {
    //   return callback({ status: 403 }, null);
    // }
  } catch (err) {
    console.log(err);
  }
};

exports.getAdminReport6 = getAdminReport6;
