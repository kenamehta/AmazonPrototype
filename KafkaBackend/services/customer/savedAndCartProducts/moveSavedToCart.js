"use strict";
const customer = require("../../../models/customer.model");

let moveSavedToCart = async (msg, callback) => {
  console.log(msg);
  customer
    .findOne({
      _id: msg.params.id,
      "savedProducts._id": msg.productId
    })
    .then(async result => {
      console.log(result);
      if (result) {
        let idx = -1;
        for (let i = 0; i < result.savedProducts.length; i++) {
          if (result.savedProducts[i]._id == msg.productId) {
            idx = i;
            break;
          }
        }
        if (idx !== -1) {
          result.cartProducts.push(result.savedProducts(idx));
          result.savedProducts.splice(idx, 1);
          result
            .save()
            .then(() => {
              return callback(null, {
                status: 200,
                savedProducts: result.savedProducts,
                cartProducts: result.cartProducts,
                savedCnt: result.savedCnt.length - 1,
                cardCnt: result.cartProducts.length + 1
              });
            })
            .catch(err => {
              console.log(err);
              return callback(
                {
                  status: 500,
                  res: err
                },
                null
              );
            });
        } else {
          return callback(
            {
              status: 403,
              res: "Selected savedProduct not found"
            },
            null
          );
        }
      } else {
        return callback(
          {
            status: 403,
            res: "Unable to move"
          },
          null
        );
      }
    });
};

exports.moveSavedToCart = moveSavedToCart;
