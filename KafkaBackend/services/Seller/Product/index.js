"use strict";
const { addProduct } = require('./addProduct');
const { existProduct } = require('./existProduct');
const { removeProduct } = require('./removeProduct');
const { updateProduct } = require('./updateProduct');
const { getProductCategories } = require('./getProductCategories');

function handle_request(msg, callback) {
  switch (msg.path) {
    case "product_add": 
        addProduct(msg, callback);
        break;
    case "product_exist":
        existProduct(msg, callback);
        break;
    case "product_delete":
        removeProduct(msg, callback);
        break;
    case "product_update":
        updateProduct(msg, callback);
        break;
    case "get_product_categories":
        getProductCategories(msg, callback);
        break;
  }
}

exports.handle_request = handle_request;