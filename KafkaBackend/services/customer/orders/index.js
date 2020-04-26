"use strict";
const { getOrders } = require("./getOrders");
const { cancelOrders } = require("./cancelOrders");
const { getCancelOrders } = require("./getCancelOrder");
const { getOpenOrders } = require("./getOpenOrders");
const {cancelCompleteOrders} = require("./cancelCompleteOrders")

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
      case "getOpenOrders":
        getOpenOrders(msg, callback);
      break;
      case "cancelCompleteOrders":
        cancelCompleteOrders(msg,callback);
        break;
  }
};

exports.handle_request = handle_request;
