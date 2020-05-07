"use strict";
const product = require("../../../models/product.model");
//const redisClient = require("../../../redisConfig");


// soft deleted a product. Soft deleting because if a customer has ordered it, the customer should still be able to reach
// product page from his/her orders using the the api "get of product/list/:productId"
const removeProductWithRedis = (msg, callback) => {
  var res = {};
  console.log(msg);
  product.findById(msg.productId, (err, foundProduct) => {
    if(err){
      res.status = 500;
      res.message = 'Database Error';
      callback(null, res);
    } 
    if(foundProduct){
      foundProduct.validFlag = "false";
      foundProduct.save((saveError, savedProduct) => {
        if(saveError){
          res.status = 500;
          res.message = 'Database Error';
        } else {

          // redisClient.setex(savedProduct.id, 36000, JSON.stringify(savedProduct));
          
          res.status = 200;
          // res.message = foundProduct;
          res.message = 'Deleted';

          console.log('Deleting from Redis');
          redisClient.del(msg.productId);
          console.log('Deleted from Redis');
        }
        callback(null, res);
      });

    } else {
      res.status = 400;
      res.message = "Not found";
      callback(null, res);
    }
  });
}

exports.removeProductWithRedis = removeProductWithRedis;