"use strict";
const product = require("../../../models/product.model");
const customer = require("../../../models/customer.model");

// Service to get all saved products that were saved by a customer
const getProducts = async (msg, callback) => {
  var savedIds = [];
  let savedCnt = 0;
  const cust = await customer.findById(msg.params.id);
  if (cust.savedProducts) {
    cust.savedProducts.map(c => {
      savedCnt++;
      savedIds.push(c.productId);
    });
  }
  if (cust.cartProducts) {
    cust.cartProducts.map(c => {
      cartCnt++;
      cartIds.push(c.productId);
    });
  }
  const savedProductsArr = await product.find({ _id: { $in: savedIds } });
  const cartProductsArr = await product.find({ _id: { $in: cartIds } });
  if (savedProductsArr) {
    return callback(null, {
      status: 200,
      cnt,
      savedProductsArr,
      cartProductsArr
    });
  } else {
    return callback({ status: 403, res: "Products not found" }, null);
  }
};

exports.getProducts = getProducts;
