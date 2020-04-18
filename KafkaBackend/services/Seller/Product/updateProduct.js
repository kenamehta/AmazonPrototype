"use strict";
const product = require("../../../models/product.model");

/*
  Check of whether the product we are trying to edit exist or not, and check of the new productName we are giving 
*/
const updateProduct = (msg, callback) => {
  var res = {};
  product.findById(msg.productId, (err, foundProduct) => {
    if(err){
      res.status = 500;
      res.message = 'Database Error';
      callback(null, res);
    } 
    if(foundProduct){
      foundProduct.productCategory = msg.productCategory;
      foundProduct.productPrice = msg.productPrice;
      foundProduct.productDescription = msg.productDescription;
      if(msg.productImagesURL){
        foundProduct.photos = msg.productImagesURL;
      }
      foundProduct.save((saveError) => {
        if(saveError){
          res.status = 500;
          res.message = 'Database Error';
        } else {
          res.status = 200;
          res.message = foundProduct;
        }
        callback(null, res);
      });
    } else {
      res.status = 404;
      res.message = "Not found";
      callback(null, res);
    }
  });
}

exports.updateProduct = updateProduct;