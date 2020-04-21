"use strict";
const { getProducts } = require("./getProducts");
const { deleteSavedProduct } = require("./deleteSavedProduct");
const { moveSavedToCart } = require("./moveSavedToCart");

let handle_request = (msg, callback) => {
  console.log("in switch");
  console.log(msg.route);
  switch (msg.route) {
    case "getProducts":
      getProducts(msg, callback);
      break;
    case "deleteSavedProduct":
      deleteSavedProduct(msg, callback);
      break;
    case "moveSavedToCart":
      moveSavedToCart(msg, callback);
      break;
  }
};

exports.handle_request = handle_request;
