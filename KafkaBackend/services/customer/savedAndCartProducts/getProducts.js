"use strict";
const product = require("../../../models/product.model");
const customer = require("../../../models/customer.model");

// Service to get all saved products that were saved by a customer
const getProducts = async (msg, callback) => {
  var savedIds = [];
  var cartIds = [];
  const cust = await customer.findById(msg.params.id);
  if (cust.savedProducts) {
    cust.savedProducts.map(c => {
      savedIds.push(c.productId);
    });
  }
  console.log(savedIds);
  if (cust.cartProducts) {
    cust.cartProducts.map(c => {
      cartIds.push(c.productId);
    });
  }
  console.log(cartIds);
  const savedProductsArr = await product.find({ _id: { $in: savedIds } });
  console.log(savedProductsArr);
  const cartProductsArr = await product.find({ _id: { $in: cartIds } });

  // The entire for loop is created by Sarthak to get cart Product information along with product info
  // getting cart products info like quantity, giftflag, giftmessage. 
  for(let i=0; i<cartProductsArr.length; i++) {
    const foundCartProduct = cust.cartProducts.find((item) => item.productId == cartProductsArr[i]._id);
    //console.log(foundCartProduct);
    const newData = {
      quantity: foundCartProduct.quantity,
      giftFlag: foundCartProduct.giftFlag,
      giftMessage: foundCartProduct.giftMessage
    }
    // _doc contains product info.
    cartProductsArr[i] = Object.assign({},cartProductsArr[i]._doc,newData);
  }

  console.log(cartProductsArr);

  return callback(null, {
    status: 200,
    savedCnt: savedProductsArr.length,
    cartCnt: cartProductsArr.length,
    savedProductsArr: savedProductsArr || [],
    cartProductsArr: cartProductsArr || []
  });
};

exports.getProducts = getProducts;
