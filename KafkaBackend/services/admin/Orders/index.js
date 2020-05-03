"use strict";
const { getAdminOrders } = require('./getAdminOrders');




function handle_request(msg, callback) {
    console.log("in order index")
  switch (msg.route) {
    case "getAdminOrders": 
        getAdminOrders(msg, callback);
        break;
        
   
  }
}

exports.handle_request = handle_request;