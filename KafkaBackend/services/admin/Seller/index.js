"use strict";
const { getSellerList } = require("./getSellerList");
const { findSeller } = require("./findSeller.js");

function handle_request(msg, callback) {
  switch (msg.path) {
    case "getSellerList":
      getSellerList(msg, callback);
      break;
    case "findSeller":
      findSeller(msg, callback);
      break;
  }
}

exports.handle_request = handle_request;
