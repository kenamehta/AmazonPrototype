"use strict";
const { getProfile } = require('./getProfile');
const { updateProfile } = require('./updateProfile');
const { updateProfileWithRedis } = require('./updateProfileWithRedis');
const { updateProfilePicture } = require('./updateProfilePicture');

function handle_request(msg, callback) {
  if(msg && msg.path){
    switch (msg.path) {
      case "seller_get": 
          getProfile(msg, callback);
          break;
      case "seller_update_profile":
          updateProfile(msg, callback);
          //updateProfileWithRedis(msg, callback);
          break;
      case "seller_update_profilePicture":
          updateProfilePicture(msg, callback);
          break;
    }
  }
}

exports.handle_request = handle_request;