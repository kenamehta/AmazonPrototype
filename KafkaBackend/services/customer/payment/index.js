"use strict";
const { addOrUpdatePayment } = require("./addOrUpdatePayment");
const { deletePayment } = require("./deletePayment");

let handle_request = (msg, callback) => {
  console.log("in switch");
  console.log(msg.route);
  switch (msg.route) {
    case "addOrUpdatePayment":
      addOrUpdatePayment(msg, callback);
      break;
    case "deletePayment":
      deletePayment(msg, callback);
      break;
  }
};

exports.handle_request = handle_request;
