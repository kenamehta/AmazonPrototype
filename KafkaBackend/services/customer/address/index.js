"use strict";
const { getAddress } = require("./getAddress");
const { addOrUpdateAddress } = require("./addOrUpdateAddress");
const { deleteAddress } = require("./deleteAddress");

let handle_request = (msg, callback) => {
  console.log("in switch");
  console.log(msg.route);
  switch (msg.route) {
    case "getAddress":
      getAddress(msg, callback);
      break;
    case "addOrUpdateAddress":
      addOrUpdateAddress(msg, callback);
      break;
    case "deleteAddress":
      deleteAddress(msg, callback);
      break;
  }
};

exports.handle_request = handle_request;
