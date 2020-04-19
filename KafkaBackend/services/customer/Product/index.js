"use strict";
const { getProduct } = require('./getProduct');
const { addComment } = require('./addComment');
const { getMultipleProducts } = require('./getMultipleProducts');

function handle_request(msg, callback) {
  switch (msg.path) {
    case "product_get": 
        getProduct(msg, callback);
        break;
    case "product_add_comment":
        addComment(msg, callback);
        break;
    case "products_get":
        getMultipleProducts(msg, callback);
        break;
  }
}

exports.handle_request = handle_request;