"use strict";
const { getSellerList } = require("./getSellerList");

function handle_request(msg, callback) {
  switch (msg.path) {
    case "getSellerList":
      getSellerList(msg, callback);
      break;
  }
}

exports.handle_request = handle_request;
