"use strict";
const { addProductCategory } = require('./addProductCategory');
const { deleteProductCategory } = require('./deleteProductCategory');

function handle_request(msg, callback) {
  switch (msg.path) {
    case "addProductCategory": 
        addProductCategory(msg, callback);
        break;
    case "deleteProductCategory":
        deleteProductCategory(msg, callback);
        break;
  }
}

exports.handle_request = handle_request;