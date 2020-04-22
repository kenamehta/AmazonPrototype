"use strict";
const customer = require("../../../models/customer.model");
const product = require("../../../models/product.model");

let deleteSavedProduct = async (msg, callback) => {
  console.log(msg);
  customer
    .findOne({
      _id: msg.params.id,
      "savedProducts.productId": msg.data.productId
    })
    .then(async result => {
      let savedCnt = 0;
      let savedIds = [];
      console.log(result);
      if (result) {
        let idx = -1;
        for (let i = 0; i < result.savedProducts.length; i++) {
          if (result.savedProducts[i].productId == msg.data.productId) {
            savedCnt++;
            idx = i;
            break;
          }
        }
        if (idx !== -1) {
          result.savedProducts.splice(idx, 1);
          result.savedProducts.map(c => {
            savedIds.push(c.productId);
          });

          result
            .save()
            .then(async () => {
              const savedProductsArr = await product.find({
                _id: { $in: savedIds }
              });
              return callback(null, {
                status: 200,
                savedProductsArr,
                savedCnt: savedProductsArr.length
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
            res: "product not found"
          },
          null
        );
      }
    });
};

exports.deleteSavedProduct = deleteSavedProduct;
