"use strict";
const { registerCustomer } = require("./registerCustomer");
const { registerSeller } = require("./registerSeller");
const { login } = require("./login");

let handle_request = (msg, callback) => {
  switch (msg.route) {
    case "login":
      login(msg, callback);
      break;
    case "registerCustomer":
      registerCustomer(msg, callback);
      break;
    case "registerSeller":
      registerSeller(msg, callback);
      break;
  }
};

exports.handle_request = handle_request;
