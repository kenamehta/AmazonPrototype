"use strict";
const customer = require("../../../models/customer.model");
const product = require("../../../models/product.model");

/*
  input: id -> user's _id
         updatedProductInCart -> New Quantity and whether gift or not

  Provide on change on qty and gift flag in frontend to hit this api
*/
const updateCart = (msg, callback) => {
  var res = {};

  customer.findById(msg.id, (err, result) => {
    if(err){
      res.status = 500;
      res.message = 'Database Error';
      callback(null, res);
    }
    if(result){
      // finding index and updating product in database
      const idx = result.cartProducts.findIndex((element)=>element._id == msg.updatedProductInCart._id);
      if(idx!==-1){
        result.cartProducts[idx].quantity = parseInt(eachUpdateProduct.quantity);
        result.cartProducts[idx].giftFlag = eachUpdateProduct.giftFlag;
        result.cartProducts[idx].giftMessage = eachUpdateProduct.giftMessage;
        
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
                //_id: eachProductInCart._id,
                _id:result._id,
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
          res.status = 200;
          res.message = customerCartWithProductDetails;
          callback(null, res);
        });
      } else {
        res.status = 400;
        res.message = 'Product Not found';
        callback(null, res);
      }
    } else {
      res.status = 400;
      res.message = 'User Not found';
      callback(null, res);
    }
  });
};

exports.updateCart = updateCart;