"use strict";
const product = require("../../../models/product.model");

const addProduct = (msg, callback) => {
  var res = {};

  const date = new Date();
  // getting date in mm/dd/yyyy format
  const myCustomDate = (date.getMonth() + 1) + "/" + (date.getDate()) + "/" + (date.getFullYear());

  let productToCreate = product({
    sellerEmailId: msg.emailId,
    sellerName: msg.sellerName,
    productName: msg.productName,
    productCategory: msg.productCategory,
    productPrice: msg.productPrice,
    productDescription: msg.productDescription,
    photos: msg.productImagesURL,
    clickCount: [{date: myCustomDate, count: 0}]
  });

  productToCreate.save((productSaveError) => {
    if(productSaveError){
      res.status = 500;
      res.message = 'Database Error';
    } else {
      res.status = 200;
      res.message = 'Success';
    }
    callback(null, res);
  })
};

exports.addProduct = addProduct;