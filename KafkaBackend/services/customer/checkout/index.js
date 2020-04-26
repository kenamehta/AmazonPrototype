"use strict";
const { proceedToOrder } = require("./proceedToOrder");

let handle_request = (msg, callback) => {
  console.log("in switch");
  console.log(msg.route);
  switch (msg.route) {
    case "proceedToOrder":
      proceedToOrder(msg, callback);
      break;
  }
};

exports.handle_request = handle_request;
