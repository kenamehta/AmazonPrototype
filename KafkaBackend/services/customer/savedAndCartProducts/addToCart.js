"use strict";
const customer = require("../../../models/customer.model");
const product = require("../../../models/product.model");

const addToCart = (msg, callback) => {
  console.log('Inside addToCart in Kafka');
  var res = {};
  customer.findById(msg.id,(err, result)=>{
    if(err){
      res.status = 500;
      res.message = 'Database Error';
      callback(null, res);
    } 
    if(result){
      const productDetails = {
        productId: msg.productId,
        sellerEmailId: msg.sellerEmailId,
        quantity: parseInt(msg.quantity),
      }
      if(msg.giftFlag === 'true'){
        productDetails.giftFlag = 'true';
        productDetails.giftMessage = msg.giftMessage;
      }
      result.cartProducts.push(productDetails);
      // console.log(result);
      result.save(async(saveError) => {
        if(saveError){
          res.status = 500;
          res.message = 'Database Error';
          callback(null, res);
        }
        let customerCartWithProductDetails = [];
        for(const eachProductInCart of result.cartProducts){
          try{
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
        // console.log(customerCartWithProductDetails);
        res.status = 200;
        res.message = customerCartWithProductDetails;
        callback(null, res);
      });
    } else{
      res.status = 400;
      res.message = 'No User Found';
      callback(null, res);
    }
  });
};

exports.addToCart = addToCart;