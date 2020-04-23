"use strict";
const customer = require("../../../models/customer.model");
const product = require("../../../models/product.model");

/*
  input: id -> user _id, cartProductId -> product's _id
*/
const deleteCartProduct = (msg, callback) => {
  var res = {};
  customer.findById(msg.id, (err, result) => {
    if (err) {
      res.status = 500;
      res.message = "Database Error";
      callback(null, res);
    }
    if (result) {
      console.log("User found");
      console.log(result);
      let idx = -1;
      for (let i = 0; i < result.cartProducts.length; i++) {
        if (result.cartProducts[i].productId === msg.productId) {
          idx = i;
          break;
        }
      }
      if (idx !== -1) {
        result.cartProducts.splice(idx, 1);
        result
          .save()
          .then(async () => {
            let customerCartWithProductDetails = [];
            for (const eachProductInCart of result.cartProducts) {
              try {
                const resultProduct = await product.findById(
                  eachProductInCart.productId
                );
                customerCartWithProductDetails.push({
                  giftFlag: eachProductInCart.giftFlag,
                  giftMessage: eachProductInCart.giftMessage,
                  //_id: eachProductInCart._id,
                  _id:resultProduct._id,
                  productId: eachProductInCart.productId,
                  sellerEmailId: eachProductInCart.sellerEmailId,
                  quantity: eachProductInCart.quantity,
                  createdAt: eachProductInCart.createdAt,
                  updatedAt: eachProductInCart.updatedAt,
                  sellerName: resultProduct.sellerName,
                  productName: resultProduct.productName,
                  productCategory: resultProduct.productCategory,
                  productPrice: resultProduct.productPrice,
                  averageRating: resultProduct.averageRating,
                  productDescription: resultProduct.productDescription,
                  photos: resultProduct.photos
                });
              } catch (error) {
                res.status = 500;
                res.message = "Database Error";
                callback(null, res);
              }
            }
            res.status = 200;
            res.message = customerCartWithProductDetails;
            callback(null, res);
          })
          .catch(err => {
            res.status = 500;
            res.message = "Database Error";
            callback(null, res);
          });
      } else {
        res.status = 400;
        res.message = "Cart Product Not found";
        callback(null, res);
      }
    } else {
      res.status = 400;
      res.message = "User Not found";
      callback(null, res);
    }
  });
};

exports.deleteCartProduct = deleteCartProduct;
