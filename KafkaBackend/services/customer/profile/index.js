"use strict";
const { getProfile } = require("./getProfile");
const { updateProfile } = require("./updateProfile");
const { updateProfilePicture } = require("./updateProfilePicture");
const { addOrUpdatePayment } = require("./addOrUpdatePayment");

const { deletePayment } = require("./deletePayment");

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
    case "addOrUpdatePayment":
      addOrUpdatePayment(msg, callback);
      break;
    case "deletePayment":
      deletePayment(msg, callback);
      break;
     
  }
};

exports.handle_request = handle_request;
