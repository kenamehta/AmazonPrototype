"use strict";
const product = require("../../../models/product.model");
const customer = require("../../../models/customer.model");

// Service to get all saved products that were saved by a customer
const getProducts = async (msg, callback) => {
  var savedIds = [];
  var cartIds = [];
  let savedCnt = 0;
  let cartCnt = 0;
  const cust = await customer.findById(msg.params.id);
  if (cust.savedProducts) {
    cust.savedProducts.map(c => {
      savedCnt++;
      savedIds.push(c.productId);
    });
  }
  console.log(savedIds);
  if (cust.cartProducts) {
    cust.cartProducts.map(c => {
      cartCnt++;
      cartIds.push(c.productId);
    });
  }
  console.log(cartIds);
  const savedProductsArr = await product.find({ _id: { $in: savedIds } });
  console.log(savedProductsArr);
  const cartProductsArr = await product.find({ _id: { $in: cartIds } });
  console.log(cartProductsArr);
  return callback(null, {
    status: 200,
    savedCnt,
    cartCnt,
    savedProductsArr: savedProductsArr || [],
    cartProductsArr: cartProductsArr || []
  });
};

exports.getProducts = getProducts;
