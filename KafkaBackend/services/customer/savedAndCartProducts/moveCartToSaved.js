"use strict";
const customer = require("../../../models/customer.model");
const product = require("../../../models/product.model");

/*
Input id -> user_id, productId -> product's _id
*/
const moveCartToSaved = (msg, callback) => {
  var res = {};
  customer.findById(msg.id, (err, result) => {
    if(err){
      res.status = 500;
      res.message = 'Database Error';
      callback(null, res);
    }
    if(result){
      let idx = -1;
      for (let i = 0; i < result.cartProducts.length; i++) {
        
        if (result.cartProducts[i].productId === msg.productId) {
          idx = i;
          break;
        }
      }
      if (idx !== -1) {
        result.savedProducts.push({productId:result.cartProducts[idx].productId,sellerEmailId:result.cartProducts[idx].sellerEmailId});
        result.cartProducts.splice(idx, 1);
        result
          .save()
          .then(async() => {
            // updated Cart Product with Product Details
            let customerCartWithProductDetails = [];
            for(const eachProductInCart of result.cartProducts){
              try {
                const result = await product.findById(eachProductInCart.productId);
                customerCartWithProductDetails.push({
                  giftFlag: eachProductInCart.giftFlag,
                  giftMessage: eachProductInCart.giftMessage,
                  _id: eachProductInCart._id,
                  productId: eachProductInCart.productId,
                  sellerEmailId: eachProductInCart.sellerEmailId,
                  quantity: eachProductInCart.quantity,
                  createdAt: eachProductInCart.createdAt,
                  updatedAt: eachProductInCart.updatedAt,
                  sellerName: result.sellerName,
                  productName: result.productName,
                  productCategory: result.productCategory,
                  productPrice: result.productPrice,
                  averageRating: result.averageRating,
                  productDescription: result.productDescription,
                  photos: result.photos
                });
              } catch(error){
                res.status = 500;
                res.message = 'Database Error';
                callback(null, res);
              }
            }

            // updated Save For Later with Product Details
            let customerSavedForLaterWithProductDetails = [];
            for(const eachProductInSaveForLater of result.savedProducts){
              try {
                const result = await product.findById(eachProductInSaveForLater.productId);
                customerSavedForLaterWithProductDetails.push({
                  _id: eachProductInSaveForLater._id,
                  productId: eachProductInSaveForLater.productId,
                  sellerEmailId: eachProductInSaveForLater.sellerEmailId,
                  createdAt: eachProductInSaveForLater.createdAt,
                  updatedAt: eachProductInSaveForLater.updatedAt,
                  sellerName: result.sellerName,
                  productName: result.productName,
                  productCategory: result.productCategory,
                  productPrice: result.productPrice,
                  averageRating: result.averageRating,
                  productDescription: result.productDescription,
                  photos: result.photos
                });
              } catch(error){
                res.status = 500;
                res.message = 'Database Error';
                callback(null, res);
              }
            }
            res.status = 200;
            res.message = {savedProductsArray: customerSavedForLaterWithProductDetails,
                            cartProductsArray: customerCartWithProductDetails}
            return callback(null, res);
          })
          .catch(err => {
            res.status = 500;
            res.message = 'Database Error';
            callback(null, res);
          });
      } else {
        res.status = 400;
        res.message = 'Product Not found in Cart';
        callback(null, res);
      }
    } else {
      res.status = 400;
      res.message = 'User Not Found';
      callback(null, res);
    }
  });
};

exports.moveCartToSaved = moveCartToSaved;