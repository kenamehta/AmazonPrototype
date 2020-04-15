"use strict";
const { getProfile } = require("./getProfile");
const { updateProfile } = require("./updateProfile");
const { updateProfilePicture } = require("./updateProfilePicture");

let handle_request = (msg, callback) => {
  console.log("in switch");
  console.log(msg.route);
  switch (msg.route) {
    case "getProfile":
      getProfile(msg, callback);
      break;
    case "updateProfile":
      updateProfile(msg, callback);
      break;
    case "updateProfilePicture":
      updateProfilePicture(msg, callback);
      break;
  }
};

exports.handle_request = handle_request;
