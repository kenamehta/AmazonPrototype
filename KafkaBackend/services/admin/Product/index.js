"use strict";
const { addProductCategory } = require('./addProductCategory');

function handle_request(msg, callback) {
  switch (msg.path) {
    case "addProductCategory": 
        addProductCategory(msg, callback);
        break;
  }
}

exports.handle_request = handle_request;