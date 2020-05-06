"use strict";
const { OrderProduct, status } = require("../../models/order");

let updateTracking = async (msg, callback) => {
  console.log(msg);

  OrderProduct.update(
    { Status: msg.status },
    { where: { _id: msg.params.orderProductId } }
  )
    .then(async result => {
      OrderProduct.findOne({
        where: { _id: msg.params.orderProductId }
      })
        .then(async result => {
          console.log(result);
          if (result) {
            const statusArr = await status.findAll();
            statusArr.map(status => {
              if (status.code <= parseInt(result.Status)) {
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
          console.log(err);
          return callback({ status: 500, res: err }, null);
        });
    })
    .catch(err => {
      return callback({ status: 500 }, null);
    });
};

exports.updateTracking = updateTracking;
