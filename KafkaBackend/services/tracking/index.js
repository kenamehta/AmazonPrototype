"use strict";
const { getTracking } = require("./getTracking");
const { updateTracking } = require("./updateTracking");

function handle_request(msg, callback) {
  switch (msg.route) {
    case "getTracking":
      getTracking(msg, callback);
      break;

    case "updateTracking":
      updateTracking(msg, callback);
      break;
  }
}

exports.handle_request = handle_request;
