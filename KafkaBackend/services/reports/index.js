"use strict";
const { getSellerReport1 } = require("./getSellerReport1");
const { getSellerReport2 } = require("./getSellerReport2");

function handle_request(msg, callback) {
  console.log("in order index");
  switch (msg.route) {
    case "getSellerReport1":
      getSellerReport1(msg, callback);
      break;
    case "getSellerReport2":
      getSellerReport2(msg, callback);
      break;
  }
}

exports.handle_request = handle_request;
