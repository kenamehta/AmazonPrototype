"use strict";
const customer = require("../../../models/customer.model");
const product = require("../../../models/product.model");

let moveSavedToCart = async (msg, callback) => {
  console.log(msg);
  let savedCnt = 0,
    cartCnt = 0;
  let savedIds = [],
    cartIds = [];
  customer
    .findOne({
      _id: msg.params.id,
      "savedProducts.productId": msg.productId
    })
    .then(async result => {
      console.log(result);
      if (result) {
        let idx = -1;
        for (let i = 0; i < result.savedProducts.length; i++) {
          if (result.savedProducts[i].productId == msg.productId) {
            idx = i;
            break;
          }
        }
        if (idx !== -1) {
          console.log(result.cartProducts);
          result.cartProducts.push(result.savedProducts[idx]);
          result.savedProducts.splice(idx, 1);

          if (result.savedProducts) {
            result.savedProducts.map(c => {
              savedIds.push(c.productId);
            });
          }
          if (result.cartProducts) {
            result.cartProducts.map(c => {
              cartIds.push(c.productId);
            });
          }
          const savedProductsArr = await product.find({
            _id: { $in: savedIds }
          });
          const cartProductsArr = await product.find({ _id: { $in: cartIds } });
          result
            .save()
            .then(() => {
              return callback(null, {
                status: 200,
                savedProductsArr,
                cartProductsArr,
                savedCnt: savedProductsArr.length,
                cartCnt: cartProductsArr.length
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
