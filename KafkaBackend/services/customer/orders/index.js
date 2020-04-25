"use strict";
const { getOrders } = require("./getOrders");
const { cancelOrders } = require("./cancelOrders");
const { getCancelOrders } = require("./getCancelOrder");


let handle_request = (msg, callback) => {
  console.log(msg.route);
  switch (msg.route) {
    case "cancelOrders":
      cancelOrders(msg, callback);
      break;
    case "getOrders":
      getOrders(msg, callback);
      break;
      case "getCancelOrders":
      getCancelOrders(msg, callback);
      break;
  }
};

exports.handle_request = handle_request;
