"use strict";
const { OrderProduct } = require("../../models/order");

let updateTracking = async (msg, callback) => {
  console.log(msg);

  OrderProduct.update(
    { Status: msg.status },
    { where: { _id: msg.params.orderProductId } }
  )
    .then(async result => {
      console.log(result);
      if (result) {
        return callback(null, { status: 200 });
      } else {
        return callback({ status: 500 }, null);
      }
    })
    .catch(err => {
      return callback({ status: 500 }, null);
    });
};

exports.updateTracking = updateTracking;
