"use strict";
const product = require("../../../models/product.model");

// sends all fields of a product document from mongoDb in response.
const getProduct = (msg, callback) => {
  var res = {};

  // msg.productId is _id of product
  // product.findOne({_id:msg.productId, validFlag:"true"}, (err, product) => {
  // for getting Product not checking validFlag true, since if customer orders product,
  // the product is in order and customer can go to order and visit product page.
  // for showing all products in database, we will use another api that will have validFlag true and thus
  // would not show deleted products in search.
  product.findById(msg.productId, (err, foundProduct) => {
    if(err){
      res.status = 500;
      res.message = 'Database Error';
      callback(null, res);
    }
    if(foundProduct){
      const date = new Date();
      // getting date in mm/dd/yyyy format
      const myCustomDate = (date.getMonth() + 1) + "/" + (date.getDate()) + "/" + (date.getFullYear());

      // checking if myCustomDate already exists in clickCount array
      const index = foundProduct.clickCount.map((each) => {
        return each.date;
      }).indexOf(myCustomDate);

      if ( index === -1 ) {
        foundProduct.clickCount.push({date: myCustomDate, count: 1});
      } else {
        foundProduct.clickCount[i].count = foundProduct.clickCount[i].count + 1;
      }

      // updating clickCount in database
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
      res.status = 400;
      res.message = "Not found";
      callback(null, res);
    }
  });
};

exports.getProduct = getProduct;