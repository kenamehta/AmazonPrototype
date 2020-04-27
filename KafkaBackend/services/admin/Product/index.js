"use strict";
const { addProductCategory } = require("./addProductCategory");
const { deleteProductCategory } = require("./deleteProductCategory");
const { getProductCategory } = require("./getProductCategory");

function handle_request(msg, callback) {
  switch (msg.path) {
    case "addProductCategory":
      addProductCategory(msg, callback);
      break;
    case "getProductCategory":
      getProductCategory(msg, callback);
      break;
    case "deleteProductCategory":
      deleteProductCategory(msg, callback);
      break;
  }
}

exports.handle_request = handle_request;
