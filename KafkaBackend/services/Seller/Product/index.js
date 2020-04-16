"use strict";
const { addProduct } = require('./addProduct');
const { existProduct } = require('./existProduct');

function handle_request(msg, callback) {
  switch (msg.path) {
    case "product_add": 
        addProduct(msg, callback);
        break;
    case "product_exist":
        existProduct(msg, callback);
        break;
  }
}

exports.handle_request = handle_request;