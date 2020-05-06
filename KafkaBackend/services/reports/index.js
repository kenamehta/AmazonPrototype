"use strict";
const { getSellerReport1 } = require("./getSellerReport1");
const { getSellerReport2 } = require("./getSellerReport2");
const { getAdminReport1 } = require("./getAdminReport1");
const { getAdminReport2 } = require("./getAdminReport2");
const { getAdminReport3 } = require("./getAdminReport3");
const { getAdminReport4 } = require("./getAdminReport4");
const { getAdminReport5 } = require("./getAdminReport5");
const { getAdminReport6 } = require("./getAdminReport6");

function handle_request(msg, callback) {
  console.log("in order index");
  switch (msg.route) {
    case "getSellerReport1":
      getSellerReport1(msg, callback);
      break;
    case "getSellerReport2":
      getSellerReport2(msg, callback);
      break;
    case "getAdminReport1":
      getAdminReport1(msg, callback);
      break;
    case "getAdminReport2":
      getAdminReport2(msg, callback);
      break;
    case "getAdminReport3":
      getAdminReport3(msg, callback);
      break;
    case "getAdminReport4":
      getAdminReport4(msg, callback);
      break;
    case "getAdminReport5":
      getAdminReport5(msg, callback);
      break;
    case "getAdminReport6":
      getAdminReport6(msg, callback);
      break;
  }
}

exports.handle_request = handle_request;
