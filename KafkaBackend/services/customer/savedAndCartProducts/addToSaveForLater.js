"use strict";
const customer = require("../../../models/customer.model");
const product = require("../../../models/product.model");

const addToSaveForLater = (msg, callback) => {
  console.log('Inside addToSaveForLater in Kafka');
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
        sellerEmailId: msg.sellerEmailId
      }
      result.savedProducts.push(productDetails);
      result.save(async(saveError) => {
        if(saveError){
          res.status = 500;
          res.message = 'Database Error';
          callback(null, res);
        }
        let customerSavedForLaterWithProductDetails = [];
        for(const eachProductInSaveForLater of result.savedProducts){
          try{
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
        res.message = customerSavedForLaterWithProductDetails;
        callback(null, res);
      });
    } else{
      res.status = 400;
      res.message = 'No User Found';
      callback(null, res);
    }
  });
};

exports.addToSaveForLater = addToSaveForLater;