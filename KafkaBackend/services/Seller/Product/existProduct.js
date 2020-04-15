"use strict";
const product = require("../../../models/product.model");

// sends all fields of a product document from mongoDb in response.
const existProduct = (msg, callback) => {
  var res = {};

  // checking for exact match, case insensitive
  product.findOne({ productName:{'$regex':'^'+msg.productName+'$',$options:'i'}, validFlag:"true" }, (err, product) => {
    if(err){
      res.status = 500;
      res.message = 'Database Error';
      callback(null, res);
    }
    // status 200 on product being found & status 400 if product doesn't exist
    if(product){
      res.status = 200;
      res.message = product;
      callback(null, res);
    } else {
      res.status = 400;
      res.message = "Not found";
      callback(null, res);
    }
  });
};

exports.existProduct = existProduct;