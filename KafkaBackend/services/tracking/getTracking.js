"use strict";
const { Order, OrderProduct, status } = require("../../models/order");

let getTracking = async (msg, callback) => {
  console.log(msg);

  OrderProduct.findOne({
    where: { _id: msg.params.orderProductId }
  })
    .then(async result => {
      console.log(result);
      if (result) {
        const statusArr = await status.findAll();
        statusArr.map(status => {
          if (status.code === parseInt(result.Status)) {
            status.flag = 1;
          } else {
            status.flag = 0;
          }
        });
        return callback(null, {
          status: 200,
          statusArr
        });
      } else {
        return callback(
          {
            status: 403,
            res: "Product not found"
          },
          null
        );
      }
    })
    .catch(err => {
      return callback({ status: 500, res: err }, null);
    });
};

exports.getTracking = getTracking;
