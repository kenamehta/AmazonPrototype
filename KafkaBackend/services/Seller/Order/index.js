"use strict";
const { getSellerProduct } = require('./getSellerProduct');


function handle_request(msg, callback) {
    console.log("in order index")
  switch (msg.route) {
    case "getSellerOrder": 
        getSellerProduct(msg, callback);
        break;
   
  }
}

exports.handle_request = handle_request;