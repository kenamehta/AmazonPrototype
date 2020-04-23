"use strict";
const { getOrders } = require("./getOrders");
const { cancelOrders } = require("./cancelOrders");

let handle_request = (msg, callback) => {
  console.log(msg.route);
  switch (msg.route) {
    case "cancelOrders":
      cancelOrders(msg, callback);
      break;
    case "getOrders":
      getOrders(msg, callback);
      break;
  }
};

exports.handle_request = handle_request;
