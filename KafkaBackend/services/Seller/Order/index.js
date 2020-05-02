"use strict";
const { getSellerProduct } = require('./getSellerProduct');
const { getOpenSellerOrders } = require('./getOpenSellerOrders');
const { cancelOrderbySeller } = require('./cancelOrderbySeller');



function handle_request(msg, callback) {
    console.log("in order index")
  switch (msg.route) {
    case "getSellerOrder": 
        getSellerProduct(msg, callback);
        break;
        case "getSellerOpenOrder": 
        getOpenSellerOrders(msg, callback);
        break;
        case "cancelOrderbySeller": 
        cancelOrderbySeller(msg, callback);
        break;
   
  }
}

exports.handle_request = handle_request;