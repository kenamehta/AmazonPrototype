"use strict";
const seller = require('../../../models/seller.model');

const getProfile = (msg, callback) => {
  console.log('Inside getProfile of Seller');
  var res = {};
  seller.findOne({emailId:msg.emailId}, (err, user) => {
    if(err){
      res.status = 500;
      res.message = 'Database Error';
    } 
    if(user){
      let userObject = {
        userId: user._id,
        emailId: user.emailId,
        name: user.name,
        phone: user.phone,
        profilePictureUrl: user.profilePictureUrl,
        street: user.street,
        city: user.city,
        state: user.state,
        country: user.country,
        zipcode: user.zipcode
      };
      res.status = 200;
      res.message = userObject;
    } else {
      res.status = 400;
      res.message = "Not Found";
    }
    callback(null, res);
  });
};

exports.getProfile = getProfile;