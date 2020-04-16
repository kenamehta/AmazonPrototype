"use strict";
const { getProduct } = require('./getProduct');
const { addComment } = require('./addComment');

function handle_request(msg, callback) {
  switch (msg.path) {
    case "product_get": 
        getProduct(msg, callback);
        break;
    case "product_add_comment":
        addComment(msg, callback);
        break;
  }
}

exports.handle_request = handle_request;